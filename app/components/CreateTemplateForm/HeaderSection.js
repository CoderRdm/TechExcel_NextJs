"use client"
import React from "react";

const HeaderSection = ({ header, handleChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Header Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="header-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="header-name"
            name="name"
            value={header.name}
            onChange={(e) => handleChange(e, "header")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <label htmlFor="header-city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="header-name"
            name="city"
            value={header.city}
            onChange={(e) => handleChange(e, "header")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <label htmlFor="header-country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="header-country"
            name="country"
            value={header.country}
            onChange={(e) => handleChange(e, "header")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <label htmlFor="header-phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="header-phone"
            name="phone"
            value={header.phone}
            onChange={(e) => handleChange(e, "header")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <label htmlFor="header-email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
           <input
            type="text"
            id="header-email"
            name="email"
            value={header.email}
            onChange={(e) => handleChange(e, "header")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Add other header fields similarly */}
      </div>
    </div>
  );
};

export default HeaderSection;