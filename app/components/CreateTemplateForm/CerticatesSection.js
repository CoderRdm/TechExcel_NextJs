"use client"
import React from "react";

const CertificatesSection = ({ certificates, handleChange, addCertificate }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Certificates</h2>
      {certificates.map((certificate, index) => (
        <div key={index} className="space-y-3 mb-4 p-3 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`certificate-name-${index}`} className="block text-sm font-medium text-gray-700">
                Certificate Name
              </label>
              <input
                type="text"
                id={`certificate-name-${index}`}
                name="name"
                value={certificate.name}
                onChange={(e) => handleChange(e, "Certificates", index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor={`certificate-link-${index}`} className="block text-sm font-medium text-gray-700">
                Certificate Link
              </label>
              <input
                type="text"
                id={`certificate-link-${index}`}
                name="link"
                value={certificate.link}
                onChange={(e) => handleChange(e, "Certificates", index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addCertificate}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Certificate
      </button>
    </div>
  );
};

export default CertificatesSection;