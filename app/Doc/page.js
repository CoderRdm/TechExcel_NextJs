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
      
      const response = await fetch('http://13.233.150.59/api/upload-resume', {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-900 py-12 relative">
      {/* Background image with overlay */} 
       <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/avatar.jpeg')", 
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-black/90"></div>
      </div>

      <Head>
        <title>Resume Verification | TechExcel</title>
        <meta name="description" content="Verify your academic credentials with TechExcel" />
      </Head>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10 p-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-br from-lime-500/90 via-blue-200 to-indigo-500 text-transparent hover:bg-gradient-to-br from-gray-100 to-slate-100 bg-clip-text  ">Resume Verification</h1>
          <p className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent text-lg bg-clip-text">Verify your academic credentials for better opportunities</p>
        </div>
        
        {!success ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-indigo-500/30">
            <div className="bg-indigo-700/80 py-4 px-6">
              <h2 className="text-white text-xl font-semibold">Submit Your Information</h2>
              <p className="text-indigo-200 text-sm">All fields are required</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="studentName" className="block text-white font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    className="w-full px-4 py-2 bg-white/20 border border-indigo-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white placeholder-indigo-200"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="studentEmail" className="block text-white font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="studentEmail"
                    className="w-full px-4 py-2 bg-white/20 border border-indigo-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white placeholder-indigo-200"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="coordinatorEmail" className="block text-white font-medium mb-2">
                    Academic Coordinator's Email
                  </label>
                  <input
                    type="email"
                    id="coordinatorEmail"
                    className="w-full px-4 py-2 bg-white/20 border border-indigo-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-white placeholder-indigo-200"
                    value={coordinatorEmail}
                    onChange={(e) => setCoordinatorEmail(e.target.value)}
                    placeholder="coordinator@university.edu"
                    required
                  />
                  <p className="text-sm text-indigo-200 mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Your academic information will be sent to this email for verification
                  </p>
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="resumeFile" className="block text-white font-medium mb-2">
                    Upload Resume (PDF or Word)
                  </label>
                  <div className="border-2 border-dashed border-indigo-300/30 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="resumeFile"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <label htmlFor="resumeFile" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-indigo-200 font-medium">Click to browse files</span>
                        <span className="text-indigo-300 text-sm mt-1">
                          {resumeFile ? resumeFile.name : 'Upload your resume in PDF or Word format'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mt-6 p-4 bg-red-900/50 border-l-4 border-red-500 text-red-100 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 flex items-center justify-center font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Submit Resume for Verification'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-green-500/30">
            <div className="bg-green-600/80 py-4 px-6">
              <h2 className="text-white text-xl font-semibold">Verification Results</h2>
              <p className="text-green-100 text-sm">Your resume has been analyzed</p>
            </div>
            
            <div className="p-6">
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-green-500/30 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-green-200 font-semibold text-lg">Resume Successfully Uploaded!</h3>
                    <p className="text-green-300">
                      Your academic information has been extracted and sent for verification.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-white">Extracted Information:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-indigo-900/50 rounded-lg p-4 border border-indigo-500/30">
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    CGPA:
                  </h4>
                  <div className="ml-7 bg-indigo-800/50 p-3 rounded border border-indigo-500/30">
                    {result?.extracted_info?.cgpa ? (
                      <span className="text-2xl font-bold text-indigo-200">{result.extracted_info.cgpa}</span>
                    ) : (
                      <span className="text-indigo-300 italic">No CGPA information found</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-indigo-900/50 rounded-lg p-4 border border-indigo-500/30">
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Board Marks:
                  </h4>
                  <div className="ml-7 bg-indigo-800/50 p-3 rounded border border-indigo-500/30">
                    {Object.keys(result?.extracted_info?.board_marks || {}).length > 0 ? (
                      <ul className="space-y-2">
                        {Object.entries(result.extracted_info.board_marks).map(([board, marks]) => (
                          <li key={board} className="flex justify-between">
                            <span className="font-medium text-white">{board}:</span>
                            <span className="text-indigo-200 font-bold">{marks}%</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-indigo-300 italic">No board marks information found</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900/50 rounded-lg p-4 mb-6 border border-indigo-500/30">
                <h4 className="font-medium text-white mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Certificate URLs:
                </h4>
                <div className="ml-7 bg-indigo-800/50 p-3 rounded border border-indigo-500/30">
                  {(result?.extracted_info?.certificate_urls?.length || 0) > 0 ? (
                    <ul className="space-y-3">
                      {result.extracted_info.certificate_urls.map((url, index) => (
                        <li key={index} className="flex items-center">
                          <div className="mr-2">
                            {result.verification_status.certificate_urls[index] === 'valid' ? (
                              <span className="inline-flex items-center rounded-full bg-green-900/70 px-2.5 py-0.5 text-xs font-medium text-green-200">
                                Valid
                              </span>
                            ) : result.verification_status.certificate_urls[index] === 'checking' ? (
                              <span className="inline-flex items-center rounded-full bg-yellow-900/70 px-2.5 py-0.5 text-xs font-medium text-yellow-200">
                                Checking
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-red-900/70 px-2.5 py-0.5 text-xs font-medium text-red-200">
                                Invalid
                              </span>
                            )}
                          </div>
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 truncate hover:underline flex-1"
                          >
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-indigo-300 italic">No certificate URLs found</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between items-center p-4 bg-indigo-900/50 rounded-lg border border-indigo-500/30">
                <div className="mb-4 sm:mb-0">
                  <span className="text-indigo-200">Request ID:</span>
                  <span className="font-mono ml-2 bg-indigo-800/50 px-2 py-1 rounded border border-indigo-500/30 text-white">{result?.request_id}</span>
                </div>
                
                <button
                  onClick={() => {
                    setSuccess(false);
                    setResult(null);
                    setStudentName('');
                    setStudentEmail('');
                    setCoordinatorEmail('');
                    setResumeFile(null);
                  }}
                  className="bg-indigo-600/80 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-300 font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Submit Another Resume
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mt-8 text-indigo-300 text-sm">
          &copy; {new Date().getFullYear()} TechExcel. All rights reserved.
        </div>
      </div>
    </div>
  );
}