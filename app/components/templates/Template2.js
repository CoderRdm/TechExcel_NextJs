"use client";
import React, { useState } from "react";

const ColorSelector = ({ activeColor, setActiveColor }) => {
  const colorOptions = [
    { name: "Teal", primary: "bg-teal-600", secondary: "bg-teal-700", text: "text-teal-600" },
    { name: "Blue", primary: "bg-blue-600", secondary: "bg-blue-700", text: "text-blue-600" }, 
    { name: "Purple", primary: "bg-purple-600", secondary: "bg-purple-700", text: "text-purple-600" },
    { name: "Red", primary: "bg-red-600", secondary: "bg-red-700", text: "text-red-600" },
    { name: "Amber", primary: "bg-amber-600", secondary: "bg-amber-700", text: "text-amber-600" },
    { name: "Emerald", primary: "bg-emerald-600", secondary: "bg-emerald-700", text: "text-emerald-600" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-100 rounded-lg">
      <div className="font-medium text-gray-800 w-full mb-2">Select Color Theme:</div>
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => setActiveColor(color)}
            className={`px-3 py-2 rounded-md text-white ${color.primary} ${
              activeColor.name === color.name ? "ring-2 ring-offset-2 ring-gray-400" : ""
            }`}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const Template1 = ({
  about,
  header,
  experiences = [],
  educations = [],
  volunteering = [],
  achievements = [],
  interests = [],
  skills = [],
  certificates = [],
}) => {
  const [activeColor, setActiveColor] = useState({
    name: "Teal",
    primary: "bg-teal-600",
    secondary: "bg-teal-700",
    text: "text-teal-600"
  });

  const patterns = [
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  ];

  const [patternIndex, setPatternIndex] = useState(0);

  const cyclePattern = () => {
    setPatternIndex((patternIndex + 1) % patterns.length);
  };

  return (
    <div className="flex flex-col min-h-full">
      <ColorSelector activeColor={activeColor} setActiveColor={setActiveColor} />
      
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div 
          className={`w-full md:w-1/3 ${activeColor.primary} text-white p-6`} 
          style={{ 
            backgroundImage: patterns[patternIndex],
            backgroundSize: 'auto',
          }}
        >
          <div className="flex flex-col items-center mb-6">
            
            <button 
              onClick={cyclePattern} 
              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-2 py-1 mb-4"
            >
              Change Background Pattern
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              <span>{header.city}, {header.country}</span>
            </div>
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span>{header.phone}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span className="break-all">{header.email}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b border-white border-opacity-30 pb-1 mb-3">
              Summary
            </h2>
            <p className="text-white text-opacity-90">{about}</p>
          </div>

          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase border-b border-white border-opacity-30 pb-1 mb-3">
                Skills
              </h2>
              <ul className="list-none pl-0">
                {skills.map((skill, index) => (
                  <li key={index} className="mb-1 flex items-center">
                    <span className="mr-2">•</span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {interests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold uppercase border-b border-white border-opacity-30 pb-1 mb-3">
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-white bg-opacity-20 text-white px-2 py-1 text-sm rounded"
                  >
                    {interest.name || interest.interests}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3 p-6 bg-white">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${activeColor.text} mb-2`}>{header.name}</h1>
            <div className={`h-1 w-16 ${activeColor.primary} rounded mb-6`}></div>
          </div>

          {experiences.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold uppercase ${activeColor.text} mb-4`}>
                Experience
              </h2>
              {experiences.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="text-gray-600 mb-1">{exp.months}</div>
                  <h3 className="font-semibold text-gray-800">{exp.jobtitle} | {exp.company}</h3>
                  <div className="text-gray-600 mb-2">{exp.country}</div>
                  {exp.description && (
                    <ul className="list-none pl-0 mt-2">
                      {exp.description.split('\n').map((item, i) => (
                        <li key={i} className="mb-1 flex items-baseline">
                          <span className={`${activeColor.text} mr-2`}>•</span>
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {educations.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold uppercase ${activeColor.text} mb-4`}>
                Education
              </h2>
              {educations.map((edu, index) => (
                <div key={index} className="mb-6">
                  <div className="text-gray-600 mb-1">{edu.months}</div>
                  <h3 className="font-semibold text-gray-800">{edu.degree} | {edu.school}</h3>
                  <div className="text-gray-600 mb-2">{edu.country}</div>
                  {edu.description && (
                    <ul className="list-none pl-0 mt-2">
                      {edu.description.split('\n').map((item, i) => (
                        <li key={i} className="mb-1 flex items-baseline">
                          <span className={`${activeColor.text} mr-2`}>•</span>
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {volunteering.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold uppercase ${activeColor.text} mb-4`}>
                Volunteering
              </h2>
              {volunteering.map((vol, index) => (
                <div key={index} className="mb-6">
                  <div className="text-gray-600 mb-1">{vol.months}</div>
                  <h3 className="font-semibold text-gray-800">{vol.role} | {vol.organization}</h3>
                  <div className="text-gray-600 mb-2">{vol.country}</div>
                  {vol.description && (
                    <ul className="list-none pl-0 mt-2">
                      {vol.description.split('\n').map((item, i) => (
                        <li key={i} className="mb-1 flex items-baseline">
                          <span className={`${activeColor.text} mr-2`}>•</span>
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {achievements.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold uppercase ${activeColor.text} mb-4`}>
                Achievements
              </h2>
              {achievements.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                  <div className="text-gray-600 mb-2">{achievement.date}</div>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}

          {certificates.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold uppercase ${activeColor.text} mb-4`}>
                Certifications
              </h2>
              {certificates.map((cert, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <div className="text-gray-600 mb-2">{cert.issuer} | {cert.date}</div>
                  {cert.description && <p className="text-gray-600">{cert.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;