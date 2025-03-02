"use client";
import React, { useState } from "react";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2"; // Import other templates
import Template3 from "../templates/Template3"; // Import other templates

const PreviewSection = ({
  about,
  header,
  experiences,
  educations,
  Volunterring,
  achievements,
  Interests,
  skills,
  Certificates,
  formData,
  formatDuration,
}) => {
  // State to track the selected template
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");

  // Function to handle template selection
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  // Render the selected template dynamically
  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "Template1":
        return (
          <Template1
            about={about}
            header={header}
            experiences={experiences}
            educations={educations}
            Volunterring={Volunterring}
            achievements={achievements}
            Interests={Interests}
            skills={skills}
            Certificates={Certificates}
          />
        );
      case "Template2":
        return (
          <Template2
            about={about}
            header={header}
            experiences={experiences}
            educations={educations}
            Volunterring={Volunterring}
            achievements={achievements}
            Interests={Interests}
            skills={skills}
            Certificates={Certificates}
          />
        );
      case "Template3":
        return (
          <Template3
            about={about}
            header={header}
            experiences={experiences}
            educations={educations}
            Volunterring={Volunterring}
            achievements={achievements}
            Interests={Interests}
            skills={skills}
            Certificates={Certificates}
          />
        );
      default:
        return <Template1 {...formData} />;
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Live Preview</h2>

        {/* Template Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Template
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleTemplateChange("Template1")}
              className={`px-4 py-2 text-sm font-medium rounded ${
                selectedTemplate === "Template1"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Template 1
            </button>
            <button
              onClick={() => handleTemplateChange("Template2")}
              className={`px-4 py-2 text-sm font-medium rounded ${
                selectedTemplate === "Template2"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Template 2
            </button>
            <button
              onClick={() => handleTemplateChange("Template3")}
              className={`px-4 py-2 text-sm font-medium rounded ${
                selectedTemplate === "Template3"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Template 3
            </button>
          </div>
        </div>

        {/* Render the Selected Template */}
        <div className="border border-gray-300 p-6 rounded-lg bg-white h-full overflow-y-auto max-h-screen">
          {renderSelectedTemplate()}
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;