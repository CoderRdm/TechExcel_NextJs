"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import html2canvas from "html2canvas";
import PreviewSection from '@/app/components/CreateTemplateForm/PreviewSection';
import jsPDF from "jspdf";
import Link from "next/link";
import { Camera } from 'lucide-react';

const TemplateDetail = ({ id }) => {
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Reuse the formatDuration function from CreateTemplateForm
  const formatDuration = (months) => {
    if (!months) return "0 months";
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    let result = "";
    if (years > 0) result += `${years} year${years > 1 ? "s" : ""}`;
    if (remainingMonths > 0) result += `${years > 0 ? " " : ""}${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    return result;
  };

  const handleDownload = async () => {
    const input = document.getElementById("resumePreview");
    const clone = input.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);
    
    const canvas = await html2canvas(clone, { scale: 2 });
    document.body.removeChild(clone);
    
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("cyber-resume.pdf");
  };

  useEffect(() => {
    if (!id) {
      setError('No template ID provided');
      setLoading(false);
      return;
    }

    const fetchSingleTemplate = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication found');

        const response = await axios.get(`http://ec2-13-203-197-138.ap-south-1.compute.amazonaws.com/api/templates/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.data) throw new Error('Empty response from server');
        setTemplate(response.data);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response?.data?.error || error.message;
        
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push('/Login');
          return;
        }

        setError(error.response?.status === 404 ? 'Template not found' : `Failed to load template: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleTemplate();
  }, [id, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-red-900/50 rounded-xl border border-red-500/30">
          <h3 className="text-2xl text-red-400 mb-4">SYSTEM ERROR</h3>
          <p className="text-red-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full transition-all"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p className="text-purple-400 mt-4">DECRYPTING TEMPLATE...</p>
        </div>
      </div>
    );
  }
  console.log(template.skills[0]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden p-10">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(to right, rgba(192, 132, 252, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(192, 132, 252, 0.1) 1px, transparent 1px)`,
        backgroundSize: `40px 40px`
      }}></div>

      <div className="max-w-full mx-auto px-8 sm:px-12 lg:px-16 py-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/show">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all">
              ← BACK TO TEMPLATES
            </button>
          </Link>
          {/* <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 px-6 py-3 rounded-xl 
                     font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-cyan-400/30
                     flex items-center gap-2"
          >
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            DOWNLOAD .CYBER
          </button> */}
        </div>

        {/* Preview Panel */}
        <div className="relative bg-gradient-to-br from-indigo-900/50 via-pink-900 to-lime-500 backdrop-blur-xl p-8 rounded-3xl border-2 border-cyan-400/30 shadow-2xl">
          <div className="mb-8 border-b border-cyan-400/30 pb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
              TEMPLATE PREVIEW - ID: {template.id}
            </h2>
          </div>

          {/* <div id="resumePreview" className="relative bg-gray-50 rounded-xl p-6 shadow-inner-xl overflow-y-auto 
            scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-100 max-h-[800px] neon-box w-full">
            <PreviewSection
              about={template.about}
              header={template.header}
              experiences={template.experiences}
              educations={template.educations}
              volunteering={template.volunteering}
              achievements={template.achievements}
              interests={template.interests}
              certificates={template.certificates}
              skills={template.skills}
              formData={template}
              formatDuration={formatDuration}
            />
          </div> */}
          <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Header Section */}
                      <div className="bg-gray-800 hover:bg-pink-500 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30 hover:-translate-y-1">
                        <h3 className="font-bold text-white mb-4 flex items-center text-lg">
                          <Camera className="h-5 w-5 mr-2 text-white" />
                          Personal Information
                        </h3>
                        {template.header ? (
                          <div className="bg-gray-900 bg-opacity-60 p-5 rounded-xl shadow-md border-l-4 border-pink-500">
                            <p className="font-medium text-lg text-white">{template.header.name}</p>
                            <p className="text-gray-300">{template.header.city}, {template.header.country}</p>
                            <p className="text-gray-300">{template.header.email}</p>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic p-4 bg-gray-900 bg-opacity-60 rounded-xl border border-gray-700">No personal information added</p>
                        )}
                      </div>
  
                      {/* Skills Section */}
                      <div className="bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-md backdrop-filter backdrop-blur-sm border border-gray-700 transform transition-all hover:shadow-purple-500/30 hover:-translate-y-1">
                        <h3 className="font-bold text-white mb-4 flex items-center text-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Skills
                        </h3>
                        {template.skills && template.skills.length > 0 ? (
                          <div className="flex flex-wrap gap-3 p-4 bg-gray-900 bg-opacity-60 rounded-xl shadow-md">
                            {template.skills.map((skillObj, i) => (
                              <div key={i}>{skillObj.skill?.name || ""}</div>
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
                          <h3 className="font-bold text-white mb-6 flex items-center text-lg">
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
                          <h3 className="font-bold text-blue-100 mb-6 flex items-center text-lg">
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
    <h3 className="font-bold text-yellow-200 mb-6 flex items-center text-lg">
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
    <h3 className="font-bold text-white mb-6 flex items-center text-lg">
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
    <h3 className="font-bold text-red-400 mb-6 flex items-center text-lg">
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
    <h3 className="font-bold text-purple-400 mb-6 flex items-center text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>

      {/* Animated Cyber Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-flicker"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}></div>
        ))}
      </div>
    </div>
  );
};

export default TemplateDetail;