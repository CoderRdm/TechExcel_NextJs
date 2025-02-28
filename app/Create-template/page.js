"use client"; // Mark this component as a Client Component

import React, { useState } from "react";

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
    skills: [{ name: "" }],
  });

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
  
    if (section) {
      if (Array.isArray(formData[section])) {
        // Handle arrays (e.g., experiences, educations, skills)
        const updatedSection = [...formData[section]];
        updatedSection[index][name] = value;
        setFormData({ ...formData, [section]: updatedSection });
      } else {
        // Handle objects (e.g., header)
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [name]: value,
          },
        });
      }
    } else {
      // Handle top-level fields (e.g., about)
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
      console.log("Template Data:", data);
    } catch (error) {
      console.error("Error:", error.message || error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Resume Template</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
        {/* About Section */}
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>

        {/* Header Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Header Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="header-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="header-name"
                name="name"
                value={formData.header.name}
                onChange={(e) => handleChange(e, "header")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="header-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="header-email"
                name="email"
                value={formData.header.email}
                onChange={(e) => handleChange(e, "header")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="header-phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="header-phone"
                name="phone"
                value={formData.header.phone}
                onChange={(e) => handleChange(e, "header")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="header-city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="header-city"
                name="city"
                value={formData.header.city}
                onChange={(e) => handleChange(e, "header")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="header-country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="header-country"
                name="country"
                value={formData.header.country}
                onChange={(e) => handleChange(e, "header")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Experiences Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experiences</h2>
          {formData.experiences.map((experience, index) => (
            <div key={index} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`experience-jobtitle-${index}`} className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id={`experience-jobtitle-${index}`}
                    name="jobtitle"
                    value={experience.jobtitle}
                    onChange={(e) => handleChange(e, "experiences", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`experience-company-${index}`} className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id={`experience-company-${index}`}
                    name="company"
                    value={experience.company}
                    onChange={(e) => handleChange(e, "experiences", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`experience-country-${index}`} className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id={`experience-country-${index}`}
                    name="country"
                    value={experience.country}
                    onChange={(e) => handleChange(e, "experiences", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`experience-months-${index}`} className="block text-sm font-medium text-gray-700">
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    id={`experience-months-${index}`}
                    name="months"
                    value={experience.months}
                    onChange={(e) => handleChange(e, "experiences", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Experience
          </button>
        </div>

        {/* Educations Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Educations</h2>
          {formData.educations.map((education, index) => (
            <div key={index} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`education-institute-${index}`} className="block text-sm font-medium text-gray-700">
                    Institute
                  </label>
                  <input
                    type="text"
                    id={`education-institute-${index}`}
                    name="institute"
                    value={education.institute}
                    onChange={(e) => handleChange(e, "educations", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`education-location-${index}`} className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id={`education-location-${index}`}
                    name="location"
                    value={education.location}
                    onChange={(e) => handleChange(e, "educations", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`education-degree-${index}`} className="block text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    id={`education-degree-${index}`}
                    name="degree"
                    value={education.degree}
                    onChange={(e) => handleChange(e, "educations", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`education-field-${index}`} className="block text-sm font-medium text-gray-700">
                    Field
                  </label>
                  <input
                    type="text"
                    id={`education-field-${index}`}
                    name="field"
                    value={education.field}
                    onChange={(e) => handleChange(e, "educations", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor={`education-graduationyear-${index}`} className="block text-sm font-medium text-gray-700">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    id={`education-graduationyear-${index}`}
                    name="graduationyear"
                    value={education.graduationyear}
                    onChange={(e) => handleChange(e, "educations", index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Education
          </button>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className="space-y-4 mb-6">
              <div>
                <label htmlFor={`skill-name-${index}`} className="block text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  type="text"
                  id={`skill-name-${index}`}
                  name="name"
                  value={skill.name}
                  onChange={(e) => handleChange(e, "skills", index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Skill
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Template
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default CreateTemplateForm;