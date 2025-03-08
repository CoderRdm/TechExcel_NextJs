"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { deleteTemplate } from '@/apiService';
import { useParams } from 'next/navigation'; 

const UserPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

        const response = await axios.get(`http://localhost:3000/api/templates/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('API Response:', response.data); // Debugging
        setTemplates(response.data);

      } catch (error) {
        console.error('Fetch Error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push('/login');
        } else {
          setError(error.response?.data?.error || 'Failed to fetch templates');
        }
      }
    };

    fetchTemplates();
  }, [router]);


 
  const handleShow = (templateId) => {
    router.push(`/templates/show/${templateId}`);
  };

  const handleEdit = (templateId) => {
    router.push(`/templates/edit/${templateId}`);
  };

  const handleDelete = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        const token = localStorage.getItem('token');
        
        // Update the API endpoint to match your backend route
        await axios.delete(`http://localhost:3000/api/deletetemplate/${templateId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Update the templates state to remove the deleted template
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        
      } catch (error) {
        console.error('Delete Error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push('/login');
        } else {
          alert(error.response?.data?.error || 'Failed to delete template');
        }
      }
    }
  };


  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 text-xl font-semibold mb-2">Error</div>
        <p>{error}</p>
        <button 
          onClick={() => router.push('/login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Resume Templates</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Manage your professional templates and customize them for different job applications.</p>
          <button 
            onClick={() => router.push('/Create-template')}
            className="mt-4 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Create New Template
          </button>
        </header>
        
        {templates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <div className="text-gray-400 text-5xl mb-4">📄</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Templates Found</h2>
            <p className="text-gray-500 mb-6">Create your first resume template to get started.</p>
            <button 
              onClick={() => router.push('/Create-template')}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Create Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {templates.map(template => (
              <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Template Header with Action Buttons */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {template.about || `Template #${template.id}`}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(template.metadata?.created).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">ID: {template.id}</p>
                    </div>
                    <div className="flex space-x-2">
                     
                      <button
                        onClick={() => handleEdit(template.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
  onClick={() => handleDelete(template.id)}
  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  Delete
</button>
                    </div>
                  </div>
                </div>

                {/* Template Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Header Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                      </h3>
                      {template.header?.length > 0 ? (
                        <ul className="space-y-3">
                          {template.header.map((hdr, index) => (
                            <li key={index} className="bg-white p-4 rounded-md shadow-sm">
                              <p className="font-medium text-lg text-gray-800">{hdr.name}</p>
                              <p className="text-gray-600">{hdr.city}, {hdr.country}</p>
                              <p className="text-gray-600">{hdr.email}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 italic">No personal information added</p>
                      )}
                    </div>

                    {/* Skills Section */}
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Skills
                      </h3>
                      {template.sections?.skills?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {template.sections.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">No skills added</p>
                      )}
                    </div>

                    {/* Experiences Section */}
                    {template.experiences?.length > 0 && (
                      <div className="col-span-2 bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Work Experience
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {template.experiences.map((exp, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-400">
                              <h4 className="font-semibold text-gray-800">{exp.jobTitle}</h4>
                              <p className="text-gray-700">{exp.company}</p>
                              <p className="text-sm text-gray-500">{exp.country} • {exp.months} months</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education Section */}
                    {template.educations?.length > 0 && (
                      <div className="col-span-2 bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                          Education
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {template.educations.map((edu, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-sm border-l-4 border-green-400">
                              <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                              <p className="text-gray-700">{edu.institute}</p>
                              <p className="text-sm text-gray-500">
                                {edu.field} • Graduated {edu.graduation_year}
                              </p>
                              {edu.location && (
                                <p className="text-sm text-gray-500">{edu.location}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements Section */}
                    {template.achievements?.length > 0 && (
                      <div className="col-span-2 bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Achievements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {template.achievements.map((ach, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-sm border-l-4 border-yellow-400">
                              <h4 className="font-semibold text-gray-800">{ach.title}</h4>
                              <p className="text-gray-600">{ach.description}</p>
                              <p className="text-sm text-gray-500">{ach.date}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certificates Section */}
                    {template.certificates?.length > 0 && (
                      <div className="col-span-2 bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Certifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {template.certificates.map((cert, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-sm border-l-4 border-purple-400">
                              <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                              <p className="text-gray-700">{cert.issuingOrganization}</p>
                              <div className="text-sm text-gray-500 space-y-1 mt-2">
                                {cert.issueDate && <p>Issued: {cert.issueDate}</p>}
                                {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
                                {cert.credentialUrl && (
                                  <a 
                                    href={cert.credentialUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline inline-flex items-center"
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
                      <div className="col-span-2 bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {template.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-green-50 to-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200"
                            >
                              {interest.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Volunteering Section */}
                    {template.volunteering?.length > 0 && (
                      <div className="col-span-2 bg-gray-50 p-5 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Volunteering
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {template.volunteering.map((vol, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-sm border-l-4 border-orange-400">
                              <h4 className="font-semibold text-gray-800">{vol.organization}</h4>
                              <p className="text-gray-700">{vol.role}</p>
                              <div className="text-sm text-gray-500 space-y-1 mt-1">
                                {vol.duration && <p>Duration: {vol.duration}</p>}
                                {vol.description && <p>{vol.description}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Template Footer with Actions
                <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
                  <div className="space-x-3">
                    <button
                      onClick={() => handleShow(template.id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Show
                    </button>
                    <button
                      onClick={() => handleEdit(template.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;