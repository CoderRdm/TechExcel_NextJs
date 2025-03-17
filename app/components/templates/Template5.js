"use client";
import React, { useState } from "react";

const Template5 = ({
  about,
  header,
  experiences = [],
  educations = [],
  Volunteering = [],
  achievements = [],
  interests = [],
  skills = [],
  certificates = [],
}) => {
  // Color theme options
  const colorThemes = {
    teal: {
      contactBar: "bg-[#2c3e50]",
      contactText: "text-white",
      sectionTitle: "text-[#2c3e50] border-b-[#2c3e50]",
      highlight: "text-[#2c3e50]",
    },
    blue: {
      contactBar: "bg-[#1a365d]",
      contactText: "text-white",
      sectionTitle: "text-[#1a365d] border-b-[#1a365d]",
      highlight: "text-[#1a365d]",
    },
    purple: {
      contactBar: "bg-[#44337a]",
      contactText: "text-white",
      sectionTitle: "text-[#44337a] border-b-[#44337a]",
      highlight: "text-[#44337a]",
    },
    green: {
      contactBar: "bg-[#276749]",
      contactText: "text-white",
      sectionTitle: "text-[#276749] border-b-[#276749]",
      highlight: "text-[#276749]",
    },
    burgundy: {
      contactBar: "bg-[#742a2a]",
      contactText: "text-white",
      sectionTitle: "text-[#742a2a] border-b-[#742a2a]",
      highlight: "text-[#742a2a]",
    }
  };

  const [activeTheme, setActiveTheme] = useState("teal");
  const theme = colorThemes[activeTheme];

  return (
    <div className="max-w-4xl mx-auto shadow-xl font-sans text-gray-700 bg-white">
      {/* Color Theme Selector */}
      <div className="flex gap-2 p-2 bg-white">
        {Object.keys(colorThemes).map((color) => (
          <button
            key={color}
            onClick={() => setActiveTheme(color)}
            className={`w-6 h-6 rounded-full ${
              color === "teal" ? "bg-[#2c3e50]" :
              color === "blue" ? "bg-[#1a365d]" :
              color === "purple" ? "bg-[#44337a]" :
              color === "green" ? "bg-[#276749]" :
              "bg-[#742a2a]"
            } ${activeTheme === color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
            aria-label={`${color} theme`}
          />
        ))}
      </div>

      {/* Contact Bar */}
      <div className={`${theme.contactBar} ${theme.contactText} p-4 flex justify-center flex-wrap gap-4`}>
        <div className="flex items-center">
          <span className="mr-2">📍</span>
          {header.city}, {header.country} {header.zipcode}
        </div>
        <div className="flex items-center">
          <span className="mr-2">📞</span>
          {header.phone}
        </div>
        <div className="flex items-center">
          <span className="mr-2">📧</span>
          {header.email}
        </div>
      </div>

      {/* Header Section */}
      <div className="py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">{header.name}</h1>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        {/* Summary */}
        <Section title="Summary" theme={theme}>
          <p className="text-gray-600 leading-relaxed">{about}</p>
        </Section>

        {/* Skills */}
        <Section title="Skills" theme={theme}>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-start">
                <span className={`mr-2 ${theme.highlight}`}>•</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience" theme={theme}>
          {experiences.map((exp, index) => (
            <ExperienceItem 
              key={index}
              title={exp.jobtitle}
              company={exp.company}
              location={exp.country}
              duration={`${exp.startDate} - ${exp.endDate || 'Present'}`}
              description={exp.description}
              theme={theme}
            />
          ))}
        </Section>

        {/* Education */}
        <Section title="Education and Training" theme={theme}>
          {educations.map((edu, index) => (
            <EducationItem
              key={index}
              year={edu.graduationyear}
              degree={`${edu.degree} in ${edu.field}`}
              institution={edu.institute}
              location={edu.location}
              theme={theme}
            />
          ))}
        </Section>

        {/* Certificates */}
        {certificates.length > 0 && (
          <Section title="Certifications" theme={theme}>
            {certificates.map((cert, index) => (
              <div key={index} className="mb-3">
                <h4 className={`font-medium ${theme.highlight}`}>{cert.name}</h4>
                {cert.date && <p className="text-sm text-gray-500">{cert.date}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <Section title="Achievements" theme={theme}>
            {achievements.map((ach, index) => (
              <div key={index} className="mb-3 flex">
                <span className={`mr-2 ${theme.highlight}`}>•</span>
                <div>
                  <span className="font-medium">{ach.title}</span>
                  {ach.description && (
                    <p className="text-gray-600">{ach.description}</p>
                  )}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Volunteering */}
        {Volunteering.length > 0 && (
          <Section title="Volunteer Experience" theme={theme}>
            {Volunteering.map((vol, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-medium">{vol.institute}</h4>
                <p className="text-sm text-gray-600">{vol.location}</p>
                <p className="text-sm text-gray-500">{vol.duration}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <Section title="Interests" theme={theme}>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span 
                  key={index}
                  className={`${theme.contactBar} ${theme.contactText} text-sm px-3 py-1 rounded-full`}
                >
                  {interest.name}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children, theme }) => (
  <div className="mb-6">
    <h2 className={`text-lg font-bold uppercase mb-3 ${theme.sectionTitle} border-b pb-1`}>
      {title}
    </h2>
    {children}
  </div>
);

// Experience Item Component
const ExperienceItem = ({ title, company, location, duration, description, theme }) => (
  <div className="mb-6">
    <div className="flex justify-between items-start mb-1 flex-wrap">
      <h3 className={`font-semibold ${theme.highlight}`}>{title}</h3>
      <span className="text-sm text-gray-600">{duration}</span>
    </div>
    <p className="font-medium text-gray-700 italic mb-2">{company}, {location}</p>
    {description && Array.isArray(description) ? (
      <ul className="list-disc pl-5 text-gray-600 space-y-1">
        {description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : description ? (
      <p className="text-gray-600">{description}</p>
    ) : null}
  </div>
);

// Education Item Component
const EducationItem = ({ year, degree, institution, location, theme }) => (
  <div className="mb-5">
    <div className="flex justify-between items-start mb-1 flex-wrap">
      <div>
        <p className={`font-medium ${theme.highlight}`}>{degree}</p>
        <p className="text-sm text-gray-600 italic">{institution}{location ? `, ${location}` : ''}</p>
      </div>
      <span className="text-sm text-gray-600">{year}</span>
    </div>
  </div>
);

export default Template5;