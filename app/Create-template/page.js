"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import HeaderSection from "../components/CreateTemplateForm/HeaderSection";
import EducationSection from "../components/CreateTemplateForm/EducationSection";
import ExperienceSection from "../components/CreateTemplateForm/ExperienceSection";
import AboutSection from "../components/CreateTemplateForm/AboutSection";
import PreviewSection from "../components/CreateTemplateForm/PreviewSection";
import VolunterringSection from "../components/CreateTemplateForm/VolunterringSection";
import AchievementsSection from "../components/CreateTemplateForm/AchievementsSection";
import InterestsSection from "../components/CreateTemplateForm/InterestsSection";
import CertificatesSection from "../components/CreateTemplateForm/CerticatesSection";
import SkillsSection from "../components/CreateTemplateForm/SkillsSection";
import Template1 from "../components/templates/Template1";

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
    Volunterring: [
      {
        institute: "",
        location: "",
        duration: "",
      },
    ],
    achievements: [ // Add achievements array
      {
        name: "",
      },
    ],
    Interests: [
      {
        interests: "", // Change from InterestsTopic to interests
      },
    ],
    Certificates:[{
      name:"",
      link:""
    }],
    skills: [{ name: "" }],
  });

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
  
    console.log("Input changed:", { name, value, section, index }); // Debugging
  
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
  
    console.log("Updated formData:", formData); // Debugging
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

  const addVolunterring = () => {
    setFormData({
      ...formData,
      Volunterring: [
        ...formData.Volunterring,
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
        { name: "" ,link:""},
      ],
    });
  };
  const addInterests = () => {
    setFormData({
      ...formData,
      Interests: [
        ...formData.Interests,
        { interests: "" }, // Use the correct key
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
    console.log(formData.skills);
    console.log("Form submitted"); // Debugging
    console.log("formData:", formData); // Debugging
  
    try {
      const response = await fetch("http://localhost:3004/api/templates/createtemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response status:", response.status); // Debugging
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Debugging
        throw new Error(errorData.error || "Failed to create template");
      }
  
      const data = await response.json();
      console.log("Template created successfully:", data); // Debugging
      alert("Template created successfully!");
    } catch (error) {
      console.error("Error:", error.message || error); // Debugging
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Resume Template</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Edit Resume</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AboutSection about={formData.about} handleChange={handleChange} />
                <HeaderSection header={formData.header} handleChange={handleChange} />
                <ExperienceSection experiences={formData.experiences} handleChange={handleChange} addExperience={addExperience} />
                <EducationSection educations={formData.educations} handleChange={handleChange} addEducation={addEducation} />
                <VolunterringSection
                  volunteering={formData.Volunterring}
                  handleChange={handleChange}
                  addVolunteering={addVolunterring}
                />
                <AchievementsSection
                  achievements={formData.achievements}
                  handleChange={handleChange}
                  addAchievement={addAchievement}
                />
                <InterestsSection
  interests={formData.Interests} // Pass the Interests array
  handleChange={handleChange}
  addInterest={addInterests}
/>
<SkillsSection
  skills={formData.skills}
  handleChange={handleChange}
  addCertificate={addSkill} // This was calling addEducation incorrectly
/>
<CertificatesSection
  certificates={formData.Certificates}
  handleChange={handleChange}
  addCertificate={addCertificates} // This was calling addEducation incorrectly
/>

                {/* Add other sections similarly */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Resume
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Preview Section */}
          <PreviewSection about={formData.about}  header={formData.header} experiences={formData.experiences} educations={formData.educations} volunteering={formData.Volunterring} achievements={formData.achievements} interests={formData.Interests}  certificates={formData.Certificates} skills={formData.skills}   formData={formData} formatDuration={formatDuration} />
           {/* <Template1 about={formData.about}  header={formData.header} experiences={formData.experiences} educations={formData.educations} volunteering={formData.Volunterring} achievements={formData.achievements} interests={formData.Interests}  certificates={formData.Certificates} skills={formData.skills}   formData={formData} formatDuration={formatDuration} /> */}
        </div>
      </div>
     
    </div>
  );
};

export default CreateTemplateForm;