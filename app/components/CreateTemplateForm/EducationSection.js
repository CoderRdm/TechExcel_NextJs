"use client";
import React from "react";

const EducationSection = ({ educations, handleChange, addEducation }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
      {educations.map((education, index) => (
        <div key={index} className="space-y-3 mb-4 p-3 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Institute */}
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

            {/* Location */}
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

            {/* Degree */}
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

            {/* Field */}
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

            {/* Graduation Year */}
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
  );
};

export default EducationSection;