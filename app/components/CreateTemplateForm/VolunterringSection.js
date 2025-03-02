"use client"
import React from "react";

const VolunteeringSection = ({ volunteering, handleChange, addVolunteering }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Volunteering</h2>
      {volunteering.map((volunteer, index) => (
        <div key={index} className="space-y-3 mb-4 p-3 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`volunteer-institute-${index}`} className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                id={`volunteer-institute-${index}`}
                name="institute"
                value={volunteer.institute}
                onChange={(e) => handleChange(e, "Volunterring", index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor={`volunteer-location-${index}`} className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id={`volunteer-location-${index}`}
                name="location"
                value={volunteer.location}
                onChange={(e) => handleChange(e, "Volunterring", index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor={`volunteer-duration-${index}`} className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                id={`volunteer-duration-${index}`}
                name="duration"
                value={volunteer.duration}
                onChange={(e) => handleChange(e, "Volunterring", index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addVolunteering}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Volunteering
      </button>
    </div>
  );
};

export default VolunteeringSection;