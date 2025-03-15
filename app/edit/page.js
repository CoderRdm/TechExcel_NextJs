"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
import CyberpunkSectionTabs from "../components/CyberpunkSectionTabs";
import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const dynamic = 'force-dynamic';

const EditTemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };
  const [formData, setFormData] = useState({
    about: "",
    header: { name: "", city: "", country: "", phone: "", email: "" },
    experiences: [{ jobTitle: "", company: "", country: "", months: 0 }],
    educations: [{ institute: "", location: "", degree: "", field: "", graduationYear: "" }],
    volunteering: [{ organization: "", role: "", duration: "", description: "" }],
    achievements: [{ title: "", description: "", date: "" }],
    interests: [{ name: "" }],
    certificates: [{ name: "", issuingOrganization: "", issueDate: "", credentialId: "", credentialUrl: "" }],
    skills: [{ name: "" }]
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  
  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    async function fetchData() {
      if (!id) return; // Only fetch if id exists
      
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:3001/api/templates/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch template: ${res.status}`);
        }
        
        const data = await res.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetching error: ", error);
        setError(error.message);
        setLoading(false);
      }
    }
    
    fetchData();
  }, [id]);

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

  // Functions to add items to arrays
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated. Please log in.");
      }
      
      const response = await fetch(`http://localhost:3001/api/templates/update/${id}`, {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update template");
      }
  
      const data = await response.json();
      alert("Template updated successfully!");
    } catch (error) {
      console.error("Error:", error.message || error);
      alert("An error occurred: " + error.message);
    }
  };

  // Helper function for formatting duration
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-purple-300 text-xl font-mono animate-pulse">Loading template data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-red-400 text-xl font-mono">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="flex justify-between p-4">
        <Link href="/show">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Show Templates
          </button>
        </Link>
        <Link href="/create">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Create New Template
          </button>
        </Link>
      </div>
      
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(to right, rgba(192, 132, 252, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(192, 132, 252, 0.1) 1px, transparent 1px)`,
        backgroundSize: `40px 40px`
      }}></div>

      <div className="max-w-full mx-auto px-8 sm:px-12 lg:px-16 py-12 relative z-10">
        {/* Glowing Header */}
        <div className="text-center mb-16 animate-pulse">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            EDIT <span className="text-cyan-400">TEMPLATE</span>
          </h1>
          <p className="text-xl text-purple-200 font-mono">Upgrade Your Digital Identity</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-[1920px] mx-auto">
          {/* Builder Panel - Neon Border Effect */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border-2 border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all w-full">
            <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/20 animate-border-pulse pointer-events-none"></div>
            
            <div className="mb-8 flex items-center justify-between border-b border-purple-500/30 pb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                ⚡ EDITOR CONSOLE
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
                <div className="group relative p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-cyan-400/40 transition-all">
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

              {/* Experience Section */}
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

              {/* Interests Section */}
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

              {/* Certificates Section */}
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

              {/* Submit Button with Update Text */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 
                         text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-cyan-500/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-30 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center text-lg">
                  🔄 UPDATE TEMPLATE
                </span>
              </button>
            </form>
          </div>

            {/* Holographic Preview Panel - Increased width */}
            <div className="sticky top-8 transform transition-transform hover:scale-[1.005] w-full">
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
                DOWNLOAD {selectedTemplate.replace("Template", "PROTOCOL ")}
              </button>
              </div>

              <div id="resumePreview" className="relative bg-white rounded-none p-6 overflow-y-auto 
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

export default EditTemplatePage;
