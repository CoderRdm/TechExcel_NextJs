"use client";
import React from "react";

// Template 3: Professional Style
const Template3 = ({
  about,
  header,
  experiences = [],
  educations = [],
  Volunterring = [],
  achievements = [],
  Interests = [],
  skills = [],
  Certificates = [],
}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b-2 border-blue-500 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-800">{header.name}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-gray-600">
          {header.city && header.country && (
            <span>
              {header.city}, {header.country}
            </span>
          )}
          {header.email && (
            <>
              <span>|</span>
              <span>{header.email}</span>
            </>
          )}
          {header.phone && (
            <>
              <span>|</span>
              <span>{header.phone}</span>
            </>
          )}
        </div>
      </div>

      {/* About */}
      {about && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">About</h2>
          <p className="text-gray-600">{about}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Experience</h2>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-medium text-gray-800">{exp.jobtitle}</h3>
              <span className="text-gray-600">{exp.months}</span>
            </div>
            <div className="flex justify-between">
              <h4 className="text-lg text-blue-600">{exp.company}</h4>
              <span className="text-gray-500">{exp.country}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Education</h2>
        {educations.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-medium text-gray-800">{edu.institute}</h3>
              <span className="text-gray-600">{edu.graduationyear}</span>
            </div>
            <div className="flex justify-between">
              <h4 className="text-lg text-blue-600">
                {edu.degree} in {edu.field}
              </h4>
              <span className="text-gray-500">{edu.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteering */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Volunteering</h2>
        {Volunterring.map((vol, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-medium text-gray-800">{vol.institute}</h3>
              <span className="text-gray-600">{vol.duration}</span>
            </div>
            <span className="text-gray-500">{vol.location}</span>
          </div>
        ))}
      </div>

      {/* Certificates */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Certificates.map((cert, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md">
              <h3 className="font-medium text-blue-600">{cert.name}</h3>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Achievements</h2>
        <ul className="list-disc pl-5">
          {achievements.map((ach, index) => (
            <li key={index} className="mb-1 text-gray-600">
              {ach.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Interests */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {Interests.map((interest, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
            >
              {interest.interests}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template3;