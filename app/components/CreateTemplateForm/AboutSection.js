"use client"
import React from "react";

const AboutSection = ({ about, handleChange }) => {
  return (
    <div>
      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
        About
      </label>
      <textarea
        id="about"
        name="about"
        value={about}
        onChange={(e) => handleChange(e)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        rows="4"
      />
    </div>
  );
};

export default AboutSection;