"use client";
import React from "react";

const ExperienceSection = ({ experiences, handleChange, addExperience }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Experiences</h3>
      {experiences.map((experience, index) => (
        <div key={index} className="space-y-3 mb-4 p-3 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Job Title */}
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

            {/* Company */}
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

            {/* Country */}
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

            {/* Months */}
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
  );
};

export default ExperienceSection;