"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { deleteTemplate } from '@/apiService';
import { useParams } from 'next/navigation'; 
import { Camera, Edit2, Trash2, Eye } from "lucide-react";
import Link from 'next/link';

const UserPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoverState, setHoverState] = useState({});

  
  const router = useRouter();
  const params = useParams(); // For Next.js App Router

  
 

  const templateId = params.id;
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          throw new Error('No authentication found');
        }

        const response = await axios.get(`http://localhost:3001/api/templates/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('API Response:', response.data); // De bugging
        if(response.data){

        }
        if(response.data.message==="No templates found"){
          setTemplates([]);
        }else{
          setTemplates(response.data);
        }
        
        console.log(templates.skills);
      } catch (error) {
        console.error('Fetch Error:', error.response?.data || error.message);
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push('/Login');
        } else {
          setError(error.response?.data?.error || 'Failed to fetch templates');
        }
      }
    };

    fetchTemplates();
  }, [router]);


 
  // const handleShow = (templateId) => {
  //   router.push(`/templates/show/${templateId}`);
  // };

  const handleEdit = (templateId) => {
    router.push(`/edit/${templateId}`);
  };



  

  // const handleDelete = async (templateId) => {
  //   try {
  //     if (!window.confirm('Permanently delete this template?')) return;
  
  //     const token = localStorage.getItem('token');
  //     if (!token) throw new Error('Authentication token missing');
  
  //     // Convert and validate ID
  //     const id = Number(templateId);
  //     if (isNaN(id)) throw new Error('Invalid template ID format');
  
  //     // Detailed request config
  //     const response = await axios.delete(
  //       `http://localhost:3000/api/templates/deletetemplate/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'X-Request-ID': crypto.randomUUID() // For server tracking
  //         },
  //         timeout: 10000 // 10 second timeout
  //       }
  //     );
  
  //     // Handle different status codes
  //     switch (response.status) {
  //       case 200:
  //         setTemplates(prev => prev.filter(t => t.id === id));
  //         alert('Template deleted successfully');
  //         break;
  //       case 404:
  //         alert('Template not found - refreshing list');
  //         setTemplates(prev => prev.filter(t => t.id === id));
  //         break;
  //       default:
  //         throw new Error(`Unexpected status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     // Detailed error diagnostics
  //     const errorDetails = {
  //       name: error.name,
  //       message: error.message,
  //       stack: error.stack,
  //       responseStatus: error.response?.status,
  //       responseData: error.response?.data,
  //       requestConfig: error.config
  //     };
  
  //     console.error('DELETE ERROR DIAGNOSTICS:', errorDetails);
      
  //     // Special handling for network errors
  //     if (error.code === 'ECONNABORTED') {
  //       alert('Connection timeout - please try again');
  //       return;
  //     }
  
  //     // Auth handling
  //     if (error.response?.status === 401) {
  //       localStorage.clear();
  //       router.push('/Login');
  //       return;
  //     }
  
  //     // Show user-friendly message
  //     alert(error.response?.data?.error || 'Deletion failed. Check console for details.');
  //   }
  // };
  const handleDelete = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.delete(`http://localhost:3001/api/templates/deletetemplate/${templateId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setTemplates(prev => prev.filter(t => t.id !== templateId));
          // Add a success notification
          alert("Template deleted successfully");
        }
        
      } catch (error) {
        console.error('Delete Error:', error);
        
        // Improved error handling
        let errorMessage = "An unexpected error occurred";
        
        if (error.response) {
          // The server responded with an error status code
          errorMessage = error.response.data?.detail || error.response.data?.error || `Server error: ${error.response.status}`;
          
          if (error.response.status === 401) {
            localStorage.clear();
            router.push('/Login');
            return;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response from server. Please check your connection.";
        } else {
          // Something happened in setting up the request
          errorMessage = error.message;
        }
        
        alert(`Deletion failed: ${errorMessage}`);
      }
    }
};






const handleCreateNew = () => {
  router.push('/Create-template');
};

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 text-xl font-semibold mb-2">Error</div>
        <p>{error}</p>
        <button 
          onClick={() => router.push('/Login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
    // Motion animations
    

    return (
      <>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-0 -z-10 h-screen w-screen bg-gradient-to-b from-black via-indigo-900 to-black opacity-40"></div>
          
          <div className="absolute top-0 left-0 w-64 h-64 bg-black rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-black rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-black rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-16 text-center relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-10 filter blur-2xl"></div>
            
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              RESUME WIZARD
            </h1>
            <p className="text-indigo-900 font-bolder max-w-2xl mx-auto text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Create mind-blowing profiles that stand out in a digital world
            </p>
            
            <button 
              className="mt-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex items-center mx-auto group"  onClick={handleCreateNew}
            >
              <span className="absolute w-12 h-12 -left-2 rounded-full bg-white mix-blend-overlay group-hover:w-full transition-all duration-300 ease-out opacity-20"></span>
              <span className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                CREATE NEW TEMPLATE
              </span>
            </button>
          </header>
          
          {templates.length == 0 ? (
            <div className="bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-16 text-center border border-gray-800">
              <div className="text-pink-400 text-8xl mb-8 animate-pulse">📄</div>
              <h2 className="text-3xl font-bold text-white mb-4">Empty Canvas</h2>
              <p className="text-gray-300 mb-10 text-lg">Your professional journey starts with your first template creation</p>
              <button 
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Start Creating
                </span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-16">
              {templates.map((template, idx) => (
                <div 
                  key={template.id} 
                  className="bg-gray-900 bg-opacity-70 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 transform transition-all duration-300 hover:shadow-purple-500/40 relative group"
                  onMouseEnter={() => setHoverState({...hoverState, [template.id]: true})}
                  onMouseLeave={() => setHoverState({...hoverState, [template.id]: false})}
                >
                  {/* Neon glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                  
                  {/* Floating particles */}
                  {hoverState[template.id] && Array.from({length: 15}).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full transform transition-all"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5,
                        animation: `float-up ${2 + Math.random() * 3}s linear infinite`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                  
                  {/* Template Header with Action Buttons */}
                  <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 p-8 border-b border-gray-800 relative overflow-hidden">
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <h2 className="text-3xl font-extrabold text-white mb-2 flex items-center">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                            {template.about || `Template #${template.id}`}
                          </span>
                          <span className="ml-3 text-xs py-1 px-3 rounded-full bg-purple-900 text-purple-200 uppercase tracking-wider">
                          </span>
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Created: {new Date(template.metadata?.created).toLocaleDateString()}
                        </p>
                        <p className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-mono">ID: {template.id}</p>
                      </div>
                      <div className="flex space-x-4">
                      <Link
                          href={{pathname: "/SingleTemplate", query: {id: template.id}}}
                          className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-red-600 transition-all duration-300 flex items-center shadow-md hover:shadow-red-400/30 text-sm font-medium"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          More info
                        </Link>
                        <Link
                          href={{pathname :"/edit", query :{id:template.id}}}
                          className="px-6 py-3 bg-indigo-900 text-indigo-100 rounded-full hover:bg-indigo-700 transition-all duration-300 flex items-center shadow-md hover:shadow-indigo-500/50 transform hover:scale-105"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        {/* delete button */}
                        <button 
    onClick={() => handleDelete(template.id)}
    className="px-6 py-3 bg-red-900 text-red-100 rounded-full hover:bg-red-700 transition-all duration-300 flex items-center shadow-md hover:shadow-red-500/50 transform hover:scale-105"
>
    <Trash2 className="h-4 w-4 mr-2" />
    Delete
</button>
                      </div>
                    </div>
                  </div>
  
                  {/* Template Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Header Section */}
                      <div className="bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30 hover:-translate-y-1">
                        <h3 className="font-bold text-gray-100 mb-4 flex items-center text-lg">
                          <Camera className="h-5 w-5 mr-2 text-pink-400" />
                          Personal Information
                        </h3>
                        {template.header? (
                          <ul className="space-y-4">
                            
                              <li  className="bg-gray-900 bg-opacity-60 p-5 rounded-xl shadow-md border-l-4 border-pink-500">
                                <p className="font-medium text-lg text-white">{template.header.name}</p>
                                <p className="text-gray-300">{template.header.city}, {template.header.country}</p>
                                <p className="text-gray-300">{template.header.email}</p>
                              </li>
                            
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic p-4 bg-gray-900 bg-opacity-60 rounded-xl border border-gray-700">No personal information added</p>
                        )}
                      </div>
  
                      {/* Skills Section */}
                      <div className="bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30 hover:-translate-y-1">
                        <h3 className="font-bold text-gray-100 mb-4 flex items-center text-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Skills
                        </h3>
                        {template.skills && template.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-3 p-4 bg-gray-900 bg-opacity-60 rounded-xl shadow-md">
                          {template.skills.map((skillObj, i) => (
                            <div key={i}>{skillObj.skill?.name || "No skills added"}</div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic p-4 bg-gray-900 bg-opacity-60 rounded-xl border border-gray-700">
                          No skills added
                        </p>
                      )}

  
</div>

  
                      {/* Experiences Section */}
                      {template.experiences?.length > 0 && (
                        <div className="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30">
                          <h3 className="font-bold text-gray-100 mb-6 flex items-center text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Work Experience
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {template.experiences.map((exp, index) => (
                              <div key={index} className="bg-gray-900 bg-opacity-60 p-6 rounded-xl shadow-md border-l-4 border-indigo-500 group transform transition-all hover:scale-105">
                                <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                                <h4 className="font-bold text-white text-xl">{exp.jobTitle}</h4>
                                <p className="text-indigo-300 font-medium mt-1">{exp.company}</p>
                                <div className="flex items-center mt-3 text-gray-400">
                                  <span className="text-xs py-1 px-3 rounded-full bg-indigo-900 text-indigo-200">
                                    {exp.country}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span className="text-xs py-1 px-3 rounded-full bg-indigo-900 text-indigo-200">
                                    {exp.months} months
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
  
                      {/* Education Section */}
                      {template.educations?.length > 0 && (
                        <div className="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30">
                          <h3 className="font-bold text-gray-100 mb-6 flex items-center text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            Education
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {template.educations.map((edu, index) => (
                              <div key={index} className="bg-gray-900 bg-opacity-60 p-6 rounded-xl shadow-md border-l-4 border-blue-500 group transform transition-all hover:scale-105">
                                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
                                <h4 className="font-bold text-white text-xl">{edu.degree}</h4>
                                <p className="text-blue-300 font-medium mt-1">{edu.institute}</p>
                                <div className="flex flex-wrap items-center mt-3 gap-2">
                                  <span className="text-xs py-1 px-3 rounded-full bg-blue-900 text-blue-200">
                                    {edu.field}
                                  </span>
                                  <span className="text-xs py-1 px-3 rounded-full bg-blue-900 text-blue-200">
                                    Graduated {edu.graduation_year}
                                  </span>
                                  {edu.location && (
                                    <span className="text-xs py-1 px-3 rounded-full bg-blue-900 text-blue-200">
                                      {edu.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}


{/* Achievements Section */}
{template.achievements?.length > 0 && (
  <div className="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30">
    <h3 className="font-bold text-gray-100 mb-6 flex items-center text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      Achievements
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {template.achievements.map((ach, index) => (
        <div key={index} className="bg-gray-900 bg-opacity-60 p-6 rounded-xl shadow-md border-l-4 border-yellow-400 group transform transition-all hover:scale-105">
          <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
          <h4 className="font-bold text-white text-xl">{ach.title}</h4>
          <p className="text-gray-300 mt-2">{ach.description}</p>
          <p className="text-sm text-yellow-200 mt-3">{ach.date}</p>
        </div>
      ))}
    </div>
  </div>
)}

{/* Certificates Section */}
{template.certificates?.length > 0 && (
  <div className="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30">
    <h3 className="font-bold text-gray-100 mb-6 flex items-center text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Certifications
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {template.certificates.map((cert, index) => (
        <div key={index} className="bg-gray-900 bg-opacity-60 p-6 rounded-xl shadow-md border-l-4 border-purple-400 group transform transition-all hover:scale-105">
          <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
          <h4 className="font-bold text-white text-xl">{cert.name}</h4>
          <p className="text-purple-300 font-medium mt-1">{cert.issuingOrganization}</p>
          <div className="text-sm text-gray-400 space-y-1 mt-3">
            {cert.issueDate && <p>Issued: {cert.issueDate}</p>}
            {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
            {cert.credentialUrl && (
              <a 
                href={cert.credentialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-300 hover:text-indigo-100 hover:underline inline-flex items-center mt-2 transition-colors"
              >
                Verify Credential
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Interests Section */}
{template.interests?.length > 0 && (
  <div className="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30">
    <h3 className="font-bold text-gray-100 mb-6 flex items-center text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      Interests
    </h3>
    <div className="flex flex-wrap gap-3 p-4 bg-gray-900 bg-opacity-60 rounded-xl shadow-md">
      {template.interests.map((interest, index) => (
        <span
          key={index}
          className="bg-gradient-to-r from-gray-900 to-red-900 text-red-200 px-4 py-2 rounded-full text-sm font-medium border border-red-800 transform transition-all hover:scale-110 shadow-md"
        >
          {interest.name}
        </span>
      ))}
    </div>
  </div>
)}

{/* Volunteering Section */}
{template.volunteering?.length > 0 && (
  <div className="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30">
    <h3 className="font-bold text-gray-100 mb-6 flex items-center text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Volunteering
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {template.volunteering.map((vol, index) => (
        <div key={index} className="bg-gray-900 bg-opacity-60 p-6 rounded-xl shadow-md border-l-4 border-orange-400 group transform transition-all hover:scale-105">
          <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
          <h4 className="font-bold text-white text-xl">{vol.organization}</h4>
          <p className="text-orange-300 font-medium mt-1">{vol.role}</p>
          <div className="text-sm text-gray-400 space-y-1 mt-3">
            {vol.duration && <p>Duration: {vol.duration}</p>}
            {vol.description && <p className="text-gray-300">{vol.description}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default UserPage;