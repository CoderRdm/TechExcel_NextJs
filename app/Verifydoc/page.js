// pages/index.js
"use client";
import { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    } else {
      setFile(null);
      setFileName('');
      setError('Please select a valid PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError('');
    } else {
      setError('Please drop a valid PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    setIsUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('pdf', file);
    
    try {
      const response = await fetch('http://localhost:3004/verify', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || 'Failed to verify the certificate.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const getProviderLogo = (provider) => {
    if (!provider) return '/images/default.png';
    
    const logos = {
      'coursera': '/images/coursera.png',
      'udemy': '/images/udemy.png',
      'linkedin': '/images/linkedin.png',
      'edx': '/images/edx.png'
    };
    
    return logos[provider.toLowerCase()] || '/images/default.png';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Certificate Verification Tool</title>
        <meta name="description" content="Verify the authenticity of educational certificates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Certificate Verification Tool</h1>
          <p className="text-gray-600 text-lg">Upload your PDF certificate to verify its authenticity</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-6 ${
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
              }`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange} 
                accept=".pdf" 
                className="hidden" 
              />
              
              <div className="flex flex-col items-center justify-center">
                <svg 
                  className="w-12 h-12 text-gray-400 mb-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                
                {fileName ? (
                  <div>
                    <p className="text-indigo-600 text-lg font-medium">{fileName}</p>
                    <p className="text-gray-500 text-sm mt-1">Click or drag to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 text-lg font-medium">Drag and drop your PDF here</p>
                    <p className="text-gray-500 text-sm mt-1">Or click to browse files</p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6">
                {error}
              </div>
            )}

            <div className="text-center">
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                disabled={isUploading || !file}
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify Certificate'
                )}
              </button>
            </div>
          </form>
        </div>

        {results && (
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verification Results</h2>
              
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded mb-6">
                <div>
                  <p className="text-gray-600">URLs detected:</p>
                  <p className="text-xl font-medium">{results.total_urls}</p>
                </div>
                <div>
                  <p className="text-gray-600">Valid certificates:</p>
                  <p className="text-xl font-medium text-green-600">{results.valid_certificates.length}</p>
                </div>
              </div>

              {results.valid_certificates.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Valid Certificates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.valid_certificates.map((cert, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                        <div className="flex items-center p-4 bg-indigo-50 border-b">
                          <div className="w-10 h-10 rounded-full bg-white p-1 mr-3">
                            <img 
                              src={getProviderLogo(cert.provider)} 
                              alt={cert.provider || 'Certificate provider'} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{cert.provider || 'Unknown Provider'}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-800 mb-2 line-clamp-2" title={cert.title}>{cert.title}</h4>
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-flex items-center"
                          >
                            View Certificate
                            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700">No valid certificates found</h3>
                  <p className="text-gray-500 mt-1">Try uploading a different PDF file</p>
                </div>
              )}

              {results.checked_urls.length > results.valid_certificates.length && (
                <div className="mt-8">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-3 bg-gray-50 rounded">
                      <span>All Checked URLs ({results.checked_urls.length})</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                            <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                            <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="border px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {results.checked_urls.map((url, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border px-4 py-2 text-sm text-blue-600 truncate max-w-xs">
                                <a href={url.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {url.url}
                                </a>
                              </td>
                              <td className="border px-4 py-2 text-sm capitalize">{url.provider || 'Unknown'}</td>
                              <td className="border px-4 py-2 text-sm truncate max-w-xs" title={url.title}>{url.title}</td>
                              <td className="border px-4 py-2 text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${url.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {url.valid ? 'Valid' : 'Invalid'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Certificate Verification Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}