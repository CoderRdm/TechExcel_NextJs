"use client"
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
export default function ATSChecker() {
  // State management (keep all existing state)
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);


  // Animation effect for content
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handle file drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      handleFileChange(selectedFile);
    }
  };

  // Handle file selection
  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    } else {
      setFile(null);
      setFileName('No file chosen');
      setError('Please select a PDF file');
    }
  };

  // Handle file input change
  const onFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);
    
    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing your resume');
    } finally {
      setIsLoading(false);
    }
  };

  // Move to next step
  const nextStep = (e) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      setStep(2);
      setError('');
    } else {
      setError('Please enter a job description');
    }
  };

  // Go back to job description step
  const prevStep = () => {
    setStep(1);
  };

  // Generate random tips
  const jobTips = [
    "Customize your resume for each job application to maximize ATS match",
    "Use industry-specific keywords from the job description",
    "Quantify your achievements with numbers when possible",
    "Keep formatting simple to ensure ATS compatibility",
    "Include a skills section with relevant technical competencies",
    "Avoid using tables, headers, footers or graphics in your resume",
    "Use standard section headings like 'Experience' and 'Education'",
    "Spell out acronyms at least once before abbreviating",
    "Save your resume as a PDF to maintain formatting",
    "File name should include your name and 'resume' for easy identification"
  ];

  const randomTips = [...jobTips].sort(() => 0.5 - Math.random()).slice(0, 3);

    // Styled version of your component
    return (
        <>
        <div className="min-h-screen w-full bg-gradient-to-br from-black to-indigo-900 relative">
        <div className="absolute inset-0 bg-[url('/favicon.ico')] opacity-5 z-0 pointer-events-none"></div>

          
          <Head>
            <title>Resume ATS Optimizer</title>
            <meta name="description" content="Optimize your resume to beat ATS systems and land more interviews" />
          </Head>
    
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Enhanced Header */}
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-4xl p-10 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse relative group">
                YOUR OWN ATS Optimizer
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get past the algorithm. Land the interview. Win the job.
              </p>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
    
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Enhanced Tips Sidebar */}
              <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 bg-gradient-to-br from-purple-500 to-indigo-200">
  <div className="flex items-center mb-6">
    <div className="p-3 bg-blue-100 rounded-lg mr-3">
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h2 className="text-xl font-bold text-gray-800">ATS Insider Tips</h2>
  </div>
  
  <div className="space-y-4">
   
      <div className="flex items-start p-4 bg-blue-50 rounded-xl">
        <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed"> "Customize your resume for each job application to maximize ATS match"</p>
      


      </div>

      <div className="flex items-start p-4 bg-blue-50 rounded-xl">
        <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed"> "    "Avoid using tables, headers, footers or graphics in your resume",
        </p>
      


 
 
      </div>

      <div className="flex items-start p-4 bg-blue-50 rounded-xl">
        <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">    "Spell out acronyms at least once before abbreviating",
        </p>
      


      </div>
      <div className="flex items-start p-4 bg-blue-50 rounded-xl">
        <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">    "Quantify your achievements with numbers when possible",
        </p>
      


      </div>
      <div className="flex items-start p-4 bg-blue-50 rounded-xl">
        <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed"> "Save your resume as a PDF to maintain formatting",</p>
      


      </div>
      <div className="flex items-start p-4 bg-blue-50 rounded-xl">
        <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">"Include a skills section with relevant technical competencies"</p>
      


      </div>

  </div>

  <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
    <h3 className="font-medium mb-2">Progress Status</h3>
    <div className="h-2 bg-white/20 rounded-full">
      <div 
        className="h-full bg-white rounded-full transition-all duration-500" 
        style={{ width: step === 1 ? '35%' : '70%' }}
      ></div>
    </div>
    <div className="flex justify-between text-xs mt-2">
      <span>Start</span>
      <span>Upload</span>
      <span>Finish</span>
    </div>
  </div>
</div>
    
              {/* Enhanced Main Form */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-8  border-gray-100 border-gray-100 bg-gradient-to-br from-purple-900 to-indigo-500">
                <div className="max-w-2xl mx-auto ">
                  {/* Progress Steps */}
                  <div className="flex items-center mb-10">
                    <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        1
                      </div>
                      <div className={`h-1 w-24 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        2
                      </div>
                    </div>
                  </div>
    
                  {!result ? (
                    <>
                      {/* Step Content */}
                      {step === 1 ? (
                        <form onSubmit={nextStep} className="space-y-8">
                          <div>
                            <label className="block text-lg font-medium text-white mb-4">
                              Paste Job Description
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                              value={jobDescription}
                              onChange={(e) => setJobDescription(e.target.value)}
                              className="w-full p-6 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200 bg-gray-50 hover:bg-white text-gray-700 placeholder-gray-400"
                              placeholder="Paste the job description you're applying for..."
                              rows="8"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                          >
                            Continue to Upload Resume →
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                          <div>
                            <label className="block text-lg font-medium text-gray-800 mb-4">
                              Upload Your Resume (PDF)
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div 
                              className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                                dragActive 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                              }`}
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <input 
                                ref={fileInputRef}
                                type="file" 
                                className="hidden" 
                                accept=".pdf" 
                                onChange={onFileInputChange} 
                              />
                              <div className="space-y-4">
                                <svg 
                                  className={`w-16 h-16 mx-auto ${
                                    file ? 'text-green-500' : 'text-blue-500'
                                  }`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  {file ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  )}
                                </svg>
                                <p className={`text-lg font-medium ${
                                  file ? 'text-green-600' : 'text-gray-600'
                                }`}>
                                  {file ? fileName : 'Click to select or drag & drop'}
                                </p>
                                {!file && (
                                  <p className="text-sm text-gray-500 mt-2">
                                    PDF format only (max 5MB)
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
    
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="w-1/3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium py-4 px-6 rounded-xl transition duration-300"
                            >
                              ← Back
                            </button>
                            <button
                              type="submit"
                              disabled={loading}
                              className="w-2/3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {loading ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Analyzing...
                                </span>
                              ) : (
                                'Analyze Resume Now'
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  ) : (
                    // Enhanced Results Section
                    <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                      Analysis Results
                    </h2>
              
                    {result.MissingKeywords?.[0] === "Could not parse response" ? (
                      <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                        <div className="flex items-center mb-3">
                          <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <h3 className="text-xl font-semibold text-red-600">Analysis Error</h3>
                        </div>
                        <p className="text-gray-700">{result.ProfileSummary}</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Match Score: {result['JD Match']}
                          </h3>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000" 
                              style={{ width: `${result['JD Match']}%` }}
                            ></div>
                          </div>
                        </div>
              
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                              Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {result.MissingKeywords?.map((keyword, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
              
                          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h4 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-900">
    Key Recommendations
  </h4>
  <div className="space-y-3">
    {result['Profile Summary']?.split('\n').map((line, index) => (
      <div key={index} className="flex items-start">
        <svg className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-purple-900">
          {line}
        </p>
      </div>
    ))}
  </div>
</div>
                        </div>
              
                        <button
                          onClick={() => {
                            setResult(null);
                            setStep(1);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                        >
                          Start New Analysis
                        </button>
                      </>
                    )}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
                  <Footer></Footer>
        </>
      );
}