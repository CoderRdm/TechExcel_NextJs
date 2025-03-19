// pages/resume-verification.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function ResumeVerification() {
  const router = useRouter();
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
        setError('');
      } else {
        setResumeFile(null);
        setError('Please upload a PDF or Word document');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!studentName || !studentEmail || !coordinatorEmail || !resumeFile) {
      setError('Please fill all fields and upload a resume');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('student_name', studentName);
      formData.append('student_email', studentEmail);
      formData.append('coordinator_email', coordinatorEmail);
      formData.append('resume', resumeFile);
      
      const response = await fetch('http://localhost:5001/api/upload-resume', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload resume');
      }
      
      setSuccess(true);
      setResult(data);
      
      // Optionally redirect to status page
      // router.push(`/verification-status/${data.request_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Resume Verification</title>
        <meta name="description" content="Verify your academic credentials" />
      </Head>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Resume Verification</h1>
        
        {!success ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="studentName" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="studentEmail" className="block text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="coordinatorEmail" className="block text-gray-700 mb-2">
                  Academic Coordinator's Email
                </label>
                <input
                  type="email"
                  id="coordinatorEmail"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={coordinatorEmail}
                  onChange={(e) => setCoordinatorEmail(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your academic information will be sent to this email for verification
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="resumeFile" className="block text-gray-700 mb-2">
                  Upload Resume (PDF or Word)
                </label>
                <input
                  type="file"
                  id="resumeFile"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Submit Resume for Verification'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-green-100 p-4 mb-6 rounded-md">
              <h2 className="text-green-700 text-lg font-semibold">Resume Successfully Uploaded!</h2>
              <p className="text-green-600">
                Your academic information has been extracted and sent for verification.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Extracted Information:</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">CGPA:</h4>
              <p className="ml-4">
                {result?.extracted_info?.cgpa ? 
                  `${result.extracted_info.cgpa}` : 
                  "No CGPA information found"}
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Board Marks:</h4>
              {Object.keys(result?.extracted_info?.board_marks || {}).length > 0 ? (
                <ul className="ml-4">
                  {Object.entries(result.extracted_info.board_marks).map(([board, marks]) => (
                    <li key={board}>{`${board}: ${marks}%`}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">No board marks information found</p>
              )}
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700">Certificate URLs:</h4>
              {(result?.extracted_info?.certificate_urls?.length || 0) > 0 ? (
                <ul className="ml-4">
                  {result.extracted_info.certificate_urls.map((url, index) => (
                    <li key={index} className="mb-1">
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {url}
                      </a>
                      <span className="ml-2 text-sm">
                        ({result.verification_status.certificate_urls[index] === 'valid' ? 
                          "Valid" : 
                          result.verification_status.certificate_urls[index] === 'checking' ? 
                            "Checking" : 
                            "Invalid"
                        })
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">No certificate URLs found</p>
              )}
            </div>
            
            <p className="mb-4">
              Request ID: <span className="font-mono">{result?.request_id}</span>
            </p>
            
            <button
              onClick={() => {
                setSuccess(false);
                setResult(null);
                setStudentName('');
                setStudentEmail('');
                setCoordinatorEmail('');
                setResumeFile(null);
              }}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Submit Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
