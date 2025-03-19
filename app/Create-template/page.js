"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import HeaderSection from "../components/CreateTemplateForm/HeaderSection";
import EducationSection from "../components/CreateTemplateForm/EducationSection";
import ExperienceSection from "../components/CreateTemplateForm/ExperienceSection";
import AboutSection from "../components/CreateTemplateForm/AboutSection";
import PreviewSection from "../components/CreateTemplateForm/PreviewSection";
import VolunteeringSection from "../components/CreateTemplateForm/VolunteeringSection";
import AchievementsSection from "../components/CreateTemplateForm/AchievementsSection";
import InterestsSection from "../components/CreateTemplateForm/InterestsSection";
import CertificatesSection from "../components/CreateTemplateForm/CerticatesSection";
import SkillsSection from "../components/CreateTemplateForm/SkillsSection";
import Template1 from "../components/templates/Template1";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CyberpunkSectionTabs from "../components/CyberpunkSectionTabs";
import Link from "next/link";
import Footer from "../components/Footer";
const CreateTemplateForm = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const [formData, setFormData] = useState({
    about: "",
    header: {
      name: "",
      city: "",
      country: "",
      phone: "",
      email: "",
    },
    experiences: [
      {
        jobTitle: "", 
        company: "",
        country: "",
        months: 0,
      },
    ],
    educations: [
      {
        institute: "",
        location: "",
        degree: "",
        field: "",
        graduationYear: "", 
      },
    ],
    volunteering: [
      {
        organization: "", 
        role: "", 
        duration: "",
        description: "", 
      },
    ],
    achievements: [
      {
        title: "", 
        description: "", 
        date: "", 
      },
    ],
    interests: [ 
      {
        name: "", 
      },
    ],
    certificates: [ 
      {
        name: "",
        issuingOrganization: "", 
        issueDate: "", 
        credentialId: "", 
        credentialUrl: "" 
      }
    ],
    skills: [{ name: "" }],
  });

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section) {
      if (Array.isArray(formData[section])) {
        const updatedSection = [...formData[section]];
        updatedSection[index][name] = value;
        setFormData({ ...formData, [section]: updatedSection });
      } else {
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [name]: value,
          },
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { jobTitle: "", company: "", country: "", months: 0 },
      ],
    });
  };
  
  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [
        ...formData.educations,
        { institute: "", location: "", degree: "", field: "", graduationYear: "" },
      ],
    });
  };
  
  const addVolunteering = () => {
    setFormData({
      ...formData,
      volunteering: [
        ...formData.volunteering,
        { organization: "", role: "", duration: "", description: "" },
      ],
    });
  };
  
  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [
        ...formData.achievements,
        { title: "", description: "", date: "" },
      ],
    });
  };
  
  const addInterest = () => {
    setFormData({
      ...formData,
      interests: [
        ...formData.interests,
        { name: "" },
      ],
    });
  };
  
  const addCertificate = () => {
    setFormData({
      ...formData,
      certificates: [
        ...formData.certificates,
        { name: "", issuingOrganization: "", issueDate: "", credentialId: "", credentialUrl: "" },
      ],
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        { name: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/api/templates/createtemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create template");
      }
  
      const data = await response.json();
      alert("Template created successfully!");
    } catch (error) {
      console.error("Error:", error.message || error);
      alert("An error occurred: " + error.message);
    }
  };

  // Helper function to format months into years and months
  const formatDuration = (months) => {
    if (!months) return "0 months";
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let result = "";
    if (years > 0) {
      result += `${years} year${years > 1 ? "s" : ""}`;
    }
    if (remainingMonths > 0) {
      result += `${years > 0 ? " " : ""}${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    }
    
    return result;
  };

  const handleDownload = async () => {
    const templateElement = document.getElementById("holographic-display");
    
    if (!templateElement) {
      alert("Template element not found");
      return;
    }
  
    // Create optimized print container
    const container = document.createElement("div");
   // Modify the container style to:
container.style.cssText = `
position: absolute;
left: -9999px;
width: 8.5in;
height: auto;
background: white;
font-family: 'Arial', sans-serif;
line-height: 1.5;
overflow: visible !important;
`;
  
    // Clone and prepare content
    const clone = templateElement.cloneNode(true);
    
    // Apply print-specific styles
    clone.style.cssText = `
      width: 100% !important;
      padding: 0.5in !important;
      font-size: 12pt !important;
      color: #000000 !important;
      box-shadow: none !important;
    `;
  
    // Remove problematic elements
    const selectorsToRemove = [
      'button', 'a', '.shadow-lg', '.rounded-lg', 
      '.hover\\:shadow-md', 'svg', 'img'
    ];
    
    selectorsToRemove.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });
  
// Instead of converting all flex/grid to block, only remove gaps
['flex', 'grid'].forEach(layout => {
  clone.querySelectorAll(`.${layout}`).forEach(el => {
    el.style.gap = '0';
    el.style.margin = '0';
  });
});
  
    // Force web-safe fonts
    clone.querySelectorAll('*').forEach(el => {
      el.style.fontFamily = 'Arial, sans-serif';
      el.style.letterSpacing = 'normal !important';
    });
  
    container.appendChild(clone);
    document.body.appendChild(container);
  
    try {
      const canvas = await html2canvas(clone, {
        scale: 3,
        logging: true,
        useCORS: true,
        backgroundColor: "#FFFFFF", // Fixed typo (was "#FFFFF")
        scrollY: -window.scrollY, // Fix for scroll position
        windowHeight: clone.scrollHeight ,// Capture full height
        allowTaint: true,
        onclone: (clonedDoc) => {
          clonedDoc.body.style.position = "relative";
          clonedDoc.body.style.width = "100%";
          clonedDoc.body.style.height = "auto";
          clonedDoc.body.style.margin = "0";
          clonedDoc.body.style.padding = "0";
          clonedDoc.body.style.overflow = "visible";
        }
      });
    
      // Calculate dimensions for PDF
      const imgWidth = 8.5; // Letter width in inches
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Initialize PDF with appropriate size
      const pdf = new jsPDF({
        orientation:  "portrait",
        unit: "in",
        format: [9.0,13],
        compress: true
      });
    
      // Handle multi-page content more efficiently
      const pageHeight = 11; // Letter height in inches
let position = 0;
let remainingHeight = imgHeight;

// Add first page
pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');

// Add additional pages if needed
while (remainingHeight > pageHeight) {
  position -= pageHeight;
  pdf.addPage();
  pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  remainingHeight -= pageHeight;
}
    
      pdf.save("professional-resume.pdf");
    
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please try again or check the console for details.");
    } finally {
      document.body.removeChild(container);
    }}
  const [activeSection, setActiveSection] = useState("about");


  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Grid Background */}
     
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(to right, rgba(192, 132, 252, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(192, 132, 252, 0.1) 1px, transparent 1px)`,
        backgroundSize: `40px 40px`
      }}></div>

      {/* Increase container width by changing max-w-7xl to max-w-full with padding */}
      <div className="max-w-full mx-auto px-8 sm:px-12 lg:px-16 py-12 relative z-10">
        {/* Glowing Header */}
        <div className="text-center mb-16 animate-pulse">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            <span className="text-cyan-400"></span>
          </h1>
          <p className="text-xl text-purple-200 font-mono">Forge Your Digital Identity</p>
        </div>

        {/* Increase width of grid components by using lg:grid-cols-2 with more width */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-[1920px] mx-auto">
          {/* Builder Panel - Neon Border Effect - Increased width */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all w-full">
            <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/20 animate-border-pulse pointer-events-none"></div>
            
            <div className="mb-8 flex items-center justify-between border-b border-purple-500/30 pb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                ⚡ Details Section
              </h2>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-green-400 shadow-green-glow"></div>
                <span className="text-purple-300 text-sm">AUTO-SAVE ACTIVE</span>
              </div>
            </div>
            
            <CyberpunkSectionTabs 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* About Section */}
              {activeSection === "about" && (
                <div className="group relative p-6 bg-gray-800/50 rounded-xl border border-indigo-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <AboutSection about={formData.about} handleChange={handleChange} />
                </div>
              )}
              
              {/* Header Section */}
              {activeSection === "header" && (
                <div className="group relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-cyan-400/40 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <HeaderSection header={formData.header} handleChange={handleChange} />
                </div>
              )}

              {/* Experience Section with Glowing Add Button */}
              {activeSection === "experiences" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in experience-section">
                  <ExperienceSection
                    experiences={formData.experiences}
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addExperience}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD EXPERIENCE MODULE
                  </button>
                </div>
              )}
              
              {/* Education Section */}
              {activeSection === "educations" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in education-section">
                  <EducationSection 
                    educations={formData.educations} 
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addEducation}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD EDUCATION MODULE
                  </button>
                </div>
              )}

              {/* Volunteering Section */}
              {activeSection === "volunteering" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in volunteering-section">
                  <VolunteeringSection
                    volunteering={formData.volunteering}
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addVolunteering}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD VOLUNTEERING MODULE
                  </button>
                </div>
              )}

              {/* Achievements Section */}
              {activeSection === "achievements" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in achievements-section">
                  <AchievementsSection
                    achievements={formData.achievements}
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addAchievement}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD ACHIEVEMENT MODULE
                  </button>
                </div>
              )}

              {/* Interests Section - FIXED */}
              {activeSection === "interests" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in interests-section">
                  <InterestsSection
                    interests={formData.interests}
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD INTEREST MODULE
                  </button>
                </div>
              )}

              {/* Certificates Section - FIXED */}
              {activeSection === "certificates" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in certificates-section">
                  <CertificatesSection
                    certificates={formData.certificates}
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addCertificate}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD CERTIFICATE MODULE
                  </button>
                </div>
              )}
                
              {/* Skills Section */}
              {activeSection === "skills" && (
                <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in skills-section">
                  <SkillsSection
                    skills={formData.skills}
                    handleChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                             font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                  >
                    <span className="mr-2">+</span>ADD SKILL MODULE
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-lime-600 to-pink-500 hover:from-slate-500 hover:to-black 
                         text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-purple-500/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-30 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center text-lg">
                  💾 Save your data with us 
                </span>
              </button>
            </form>
          </div>

          {/* Holographic Preview Panel - Increased width */}
          <div className="sticky top-8 transform transition-transform hover:scale-[1.005] w-full ">
            <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-cyan-400/30 
                          shadow-2xl hover:shadow-cyan-400/20 transition-all">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
              
              <div className="relative z-10 flex justify-between items-center mb-8 pb-6 border-b border-cyan-400/30">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
                  LIVE-PREVIEW
                </h2>
                <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 px-6 py-3 rounded-xl 
                        font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-cyan-400/30
                        flex items-center gap-2"
              >
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                DOWNLOAD {selectedTemplate.replace("Template", "Template ")}
              </button>
              </div>

              <div id="resumePreview" className="relative bg-slate-900 rounded-none p-6 overflow-y-auto 
                 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-100 max-h-[800px] w-full">
               <PreviewSection
                about={formData.about}
                header={formData.header}
                experiences={formData.experiences}
                educations={formData.educations}
                volunteering={formData.volunteering}
                achievements={formData.achievements}
                interests={formData.interests}
                certificates={formData.certificates}
                skills={formData.skills}
                formData={formData}
                formatDuration={formatDuration}
                selectedTemplate={selectedTemplate}
                onTemplateChange={handleTemplateChange}
              />
              </div>
            </div>

            {/* Cybernetic Enhancement Prompt */}
            <div className="mt-6 p-4 bg-cyan-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 
                          animate-pulse-slow">
              <p className="text-sm text-cyan-300 text-center font-mono">
                ⚠️ WARNING: 98% RECRUITER ENGAGEMENT RATE DETECTED
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Cyber Grid Overlay */}
      {/* <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-flicker"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}></div>
        ))}
      </div> */}
    </div>
    <Footer></Footer>

    </>
  );
};

export default CreateTemplateForm;