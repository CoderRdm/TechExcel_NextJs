"use client";
import React, { useState } from "react";

const ColorSelector = ({ activeColor, setActiveColor }) => {
  const colorOptions = [
    { name: "Emerald", bg: "bg-emerald-600", text: "text-emerald-700", border: "border-emerald-700" },
    { name: "Blue", bg: "bg-blue-600", text: "text-blue-700", border: "border-blue-700" },
    { name: "Purple", bg: "bg-purple-600", text: "text-purple-700", border: "border-purple-700" },
    { name: "Red", bg: "bg-red-600", text: "text-red-700", border: "border-red-700" },
    { name: "Amber", bg: "bg-amber-600", text: "text-amber-700", border: "border-amber-700" },
    { name: "Teal", bg: "bg-teal-600", text: "text-teal-700", border: "border-teal-700" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-100 rounded-lg">
      <div className="font-medium text-gray-800 w-full mb-2">Select Color Theme:</div>
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => setActiveColor(color)}
            className={`px-3 py-2 rounded-md text-white ${color.bg} ${
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

const ModernTemplate = ({
  about,
  header,
  experiences = [],
  educations = [],
  volunteering = [],
  achievements = [],
  Interests = [],
  skills = [],
  Certificates = [],
}) => {
  const [activeColor, setActiveColor] = useState({
    name: "Emerald",
    bg: "bg-emerald-600",
    text: "text-emerald-700",
    border: "border-emerald-700"
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Color Selector */}
      <ColorSelector activeColor={activeColor} setActiveColor={setActiveColor} />

      {/* Header with dynamic color */}
      <div className={`${activeColor.bg} text-white p-6 flex justify-between items-start`}>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-wider">{header.name}</h1>
        </div>
        <div className="text-right text-sm">
          {header.email && <div>{header.email}</div>}
          {header.phone && <div>{header.phone}</div>}
          {header.city && header.country && (
            <div>
              {header.city}, {header.country}
            </div>
          )}
        </div>
      </div>

      {/* Main content with two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left column - narrower */}
        <div className="w-full md:w-1/3 p-6 bg-gray-50">
          {/* Summary/About */}
          {about && (
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
                Summary
              </h2>
              <p className="text-gray-700">{about}</p>
            </div>
          )}

          {/* Skills */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Skills
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {skills.map((skill, index) => (
                <li key={index} className="mb-1">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Education and Training
            </h2>
            {educations.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium text-gray-800">
                  {edu.institute} - {edu.location}
                </h3>
                <p className="text-gray-700">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-gray-600 text-sm">{edu.graduationyear}</p>
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Certificates
            </h2>
            {Certificates.map((cert, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-medium text-gray-800">{cert.name}</h3>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${activeColor.text} hover:underline`}
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Interests */}
          <div>
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {Interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded"
                >
                  {interest.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - wider */}
        <div className="w-full md:w-2/3 p-6">
          {/* Experience */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Experience
            </h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{exp.jobtitle}</h3>
                  <span className="text-gray-600 text-sm">{exp.months}</span>
                </div>
                <p className="text-gray-700 font-medium">
                  {exp.company} - {exp.country}
                </p>
                {exp.description && (
                  <ul className="list-disc pl-5 mt-2 text-gray-700">
                    {exp.description.split('\n').map((item, i) => (
                      <li key={i} className="mt-1">{item.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Volunteering */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Volunteering
            </h2>
            {volunteering && volunteering.length > 0 ? (
              volunteering.map((vol, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">
                      {vol.organization || vol.institute}
                    </h3>
                    <span className="text-gray-600 text-sm">{vol.duration}</span>
                  </div>
                  {vol.role && (
                    <p className="text-gray-700 font-medium">{vol.role}</p>
                  )}
                  <p className="text-gray-600 text-sm">{vol.location}</p>
                  {vol.description && (
                    <p className="text-gray-700 mt-1">{vol.description}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No volunteering experience added
              </p>
            )}
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1`}>
              Achievements
            </h2>
            <ul className="list-none pl-0">
              {achievements.map((ach, index) => (
                <li key={index} className="mb-3">
                  <div className="flex items-baseline">
                    <span className={activeColor.text + " mr-2"}>•</span>
                    <span className="font-medium text-gray-800">{ach.title}</span>
                  </div>
                  {ach.description && (
                    <p className="ml-6 text-gray-700">{ach.description}</p>
                  )}
                  {ach.date && (
                    <p className="ml-6 text-gray-500 text-sm">{ach.date}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;