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


const CreateTemplateForm = () => {
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
        jobtitle: "",
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
        graduationyear: "",
      },
    ],
    volunteering: [
      {
        institute: "",
        location: "",
        duration: "",
      },
    ],
    achievements: [
      {
        name: "",
      },
    ],
    Interests: [
      {
        interests: "",
      },
    ],
    Certificates: [{
      name: "",
      link: ""
    }],
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
        { jobtitle: "", company: "", country: "", months: 0 },
      ],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [
        ...formData.educations,
        { institute: "", location: "", degree: "", field: "", graduationyear: "" },
      ],
    });
  };

  const addVolunteering = () => {
    setFormData({
      ...formData,
      volunteering: [
        ...formData.volunteering,
        { institute: "", location: "", duration: "" },
      ],
    });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [
        ...formData.achievements,
        { name: "" },
      ],
    });
  };
  
  const addCertificates = () => {
    setFormData({
      ...formData,
      Certificates: [
        ...formData.Certificates,
        { name: "", link: "" },
      ],
    });
  };
  
  const addInterests = () => {
    setFormData({
      ...formData,
      Interests: [
        ...formData.Interests,
        { interests: "" },
      ],
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/api/templates/createtemplate", {
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
  const [activeSection, setActiveSection] = useState("about");


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <Link href="/show">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Show Templates
      </button>
    </Link>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(to right, rgba(192, 132, 252, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(192, 132, 252, 0.1) 1px, transparent 1px)`,
        backgroundSize: `40px 40px`
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Glowing Header */}
        <div className="text-center mb-16 animate-pulse">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            CYBER<span className="text-cyan-400">CV</span>
          </h1>
          <p className="text-xl text-purple-200 font-mono">Forge Your Digital Identity</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Builder Panel - Neon Border Effect */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all">
            <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/20 animate-border-pulse pointer-events-none"></div>
            
            <div className="mb-8 flex items-center justify-between border-b border-purple-500/30 pb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                ⚡ BUILDER CONSOLE
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
              {/* Section Cards with Hover Effects */}
              <div className="group relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-cyan-400/40 transition-all">
              {activeSection === "about" && (
  <div className="group relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-cyan-400/40 transition-all">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <AboutSection about={formData.about} handleChange={handleChange} />
  </div>
)}
              </div>
              

              {activeSection === "header" && (
  <div className="group relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-cyan-400/40 transition-all">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <HeaderSection header={formData.header} handleChange={handleChange} />
  </div>
)}

             

              {/* Experience Section with Glowing Add Button */}

              
              
              {activeSection === "experiences" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
    <ExperienceSection
      experiences={formData.experiences}
      handleChange={handleChange}
      addExperience={() => {
        addExperience();
        document.querySelector('.experience-section').classList.add('animate-highlight');
      }}
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
              {/* Repeat similar styled sections for other components */}
              
              {activeSection === "educations" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
                <EducationSection 
                  educations={formData.educations} 
                  handleChange={handleChange} 
                  addEducation={() => {
                    addEducation();
                    document.querySelector('.experience-section').classList.add('animate-highlight');}} 
                />
           
                <button
                  type="button"
                  onClick={addEducation}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                           font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                >
                  <span className="mr-2">+</span>ADD Education MODULE
                </button>
  </div>
)}
              

              {activeSection === "volunteering" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
               <VolunteeringSection
                  volunteering={formData.volunteering}
                  handleChange={handleChange}
                  addVolunteering={() => {
                    addVolunteering();
                    document.querySelector('.experience-section').classList.add('animate-highlight');}}
                />
             
           
                <button
                  type="button"
                  onClick={addVolunteering}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
                           font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
                >
                  <span className="mr-2">+</span>ADD Volunteering MODULE
                </button>
  </div>
)}


              

              
                
{activeSection === "achievements" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
    <AchievementsSection
      achievements={formData.achievements}
      handleChange={handleChange}
      addAchievement={() => {
        addAchievement();
        document.querySelector('.experience-section').classList.add('animate-highlight');
      }}
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
              

              {activeSection === "interests" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
    <InterestsSection
      interests={formData.Interests}
      handleChange={handleChange}
      addInterest={() => {
        addInterests();
        document.querySelector('.experience-section').classList.add('animate-highlight');
      }}
    />
    
    <button
      type="button"
      onClick={addInterests}
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
               font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
    >
      <span className="mr-2">+</span>ADD INTERESTS MODULE
    </button>
  </div>)}

{activeSection === "certificates" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
    <CertificatesSection
      certificates={formData.Certificates}
      handleChange={handleChange}
      addCertificate={() => {
        addCertificates();
        document.querySelector('.experience-section').classList.add('animate-highlight');
      }}
    />
    
    <button
      type="button"
      onClick={addCertificates}
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
               font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
    >
      <span className="mr-2">+</span>ADD CERTIFICATES MODULE
    </button>
  </div>
)}
                
               
                {activeSection === "skills" && (
  <div className="relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 group animate-fade-in">
    <SkillsSection
      skills={formData.skills}
      handleChange={handleChange}
      addSkill={() => {
        addSkill();
        document.querySelector('.experience-section').classList.add('animate-highlight');
      }}
    />
    
    <button
      type="button"
      onClick={addSkill}
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full 
               font-bold transition-all shadow-lg hover:scale-105 hover:shadow-purple-500/40 flex items-center"
    >
      <span className="mr-2">+</span>ADD SKILLS MODULE
    </button>
  </div>
)}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 
                         text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-purple-500/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-30 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center text-lg">
                  💾 Save your data
                </span>
              </button>
            </form>
          </div>

          {/* Holographic Preview Panel */}
          <div className="sticky top-8 transform transition-transform hover:scale-[1.005]">
            <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-cyan-400/30 
                          shadow-2xl hover:shadow-cyan-400/20 transition-all">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
              
              <div className="relative z-10 flex justify-between items-center mb-8 pb-6 border-b border-cyan-400/30">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
                  HOLO-PREVIEW ™
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
                  DOWNLOAD .CYBER
                </button>
              </div>

              <div id="resumePreview" className="relative bg-gray-50 rounded-xl p-6 shadow-inner-xl overflow-y-auto 
                scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-100 max-h-[800px] neon-box">
                <PreviewSection
                  about={formData.about}
                  header={formData.header}
                  experiences={formData.experiences}
                  educations={formData.educations}
                  volunteering={formData.volunteering}
                  achievements={formData.achievements}
                  interests={formData.Interests}
                  certificates={formData.Certificates}
                  skills={formData.skills}
                  formData={formData}
                  formatDuration={formatDuration}
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

export default CreateTemplateForm;