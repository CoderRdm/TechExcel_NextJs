"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else if (selectedFile) {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please upload a resume');
      return;
    }
    
    if (!jobDescription) {
      setError('Please enter a job description');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);
    
    try {
      // Update the URL to point to your Flask API
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error analyzing resume');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Head>
        <title>ATS Resume Checker</title>
        <meta name="description" content="Check your resume against ATS systems" />
      </Head>

      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">ATS Resume Checker</h1>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="resume" className="block mb-2 font-medium text-gray-700">
              Upload Your Resume (PDF only)
            </label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              accept=".pdf"
              className="w-full border border-gray-300 rounded-md p-3 text-sm"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="jobDescription" className="block mb-2 font-medium text-gray-700">
              Paste Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full border border-gray-300 rounded-md p-3 h-64 text-sm"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition duration-200"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>
        
        {loading && (
          <div className="text-center my-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-3 text-gray-600">Analyzing your resume... Please wait.</p>
          </div>
        )}
        
        {results && !loading && (
          <div className="mt-10 p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-center">ATS Analysis Results</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">ATS Match Score</h3>
              <div className="h-6 w-full bg-gray-200 rounded-full">
                <div
                  className="h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ width: results['JD Match'] }}
                >
                  {results['JD Match']}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Missing Keywords</h3>
              <div className="flex flex-wrap">
                {results['MissingKeywords'].map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm m-1"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Profile Summary</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {results['Profile Summary']}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}