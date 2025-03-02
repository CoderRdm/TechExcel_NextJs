"use client";
import React from "react";

const InterestsSection = ({ interests, handleChange, addInterest }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Interests</h2>
      {interests.map((interest, index) => (
        <div key={index} className="space-y-3 mb-4 p-3 border border-gray-200 rounded-md">
          <div>
            <label htmlFor={`interest-${index}`} className="block text-sm font-medium text-gray-700">
              Interest
            </label>
            <input
              type="text"
              id={`interest-${index}`}
              name="interests" // Ensure this matches the key in your form data
              value={interest.interests} // Access the correct field
              onChange={(e) => handleChange(e, "Interests", index)} // Pass the correct section name
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addInterest}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Interest
      </button>
    </div>
  );
};

export default InterestsSection;