"use client";
import React, { useState } from "react";

const Template4 = ({
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
    mint: {
      header: "bg-[#e0eaea]",
      contactBar: "bg-[#333333]",
      contactText: "text-white",
      sectionTitle: "text-[#333333] border-b-[#333333]",
      highlight: "text-[#333333]",
      skillBg: "bg-[#e0eaea]",
      skillText: "text-[#333333]",
    },
    blue: {
      header: "bg-[#e6f0ff]",
      contactBar: "bg-[#2c5282]",
      contactText: "text-white",
      sectionTitle: "text-[#2c5282] border-b-[#2c5282]",
      highlight: "text-[#2c5282]",
      skillBg: "bg-[#e6f0ff]",
      skillText: "text-[#2c5282]",
    },
    teal: {
      header: "bg-[#e6fffa]",
      contactBar: "bg-[#285e61]",
      contactText: "text-white",
      sectionTitle: "text-[#285e61] border-b-[#285e61]",
      highlight: "text-[#285e61]",
      skillBg: "bg-[#e6fffa]",
      skillText: "text-[#285e61]",
    },
    purple: {
      header: "bg-[#f5f0ff]",
      contactBar: "bg-[#553c9a]",
      contactText: "text-white",
      sectionTitle: "text-[#553c9a] border-b-[#553c9a]",
      highlight: "text-[#553c9a]",
      skillBg: "bg-[#f5f0ff]",
      skillText: "text-[#553c9a]",
    },
    gray: {
      header: "bg-[#f0f0f0]",
      contactBar: "bg-[#4a5568]",
      contactText: "text-white",
      sectionTitle: "text-[#4a5568] border-b-[#4a5568]",
      highlight: "text-[#4a5568]",
      skillBg: "bg-[#f0f0f0]",
      skillText: "text-[#4a5568]",
    }
  };

  const [activeTheme, setActiveTheme] = useState("mint");
  const theme = colorThemes[activeTheme];

  return (
    <div className="max-w-4xl mx-auto shadow-xl rounded-sm font-[Arial] text-gray-700 bg-white">
      {/* Color Theme Selector */}
      <div className="flex gap-2 p-2 bg-white">
        {Object.keys(colorThemes).map((color) => (
          <button
            key={color}
            onClick={() => setActiveTheme(color)}
            className={`w-6 h-6 rounded-full ${
              color === "mint" ? "bg-[#e0eaea] border border-[#333333]" :
              color === "blue" ? "bg-[#e6f0ff] border border-[#2c5282]" :
              color === "teal" ? "bg-[#e6fffa] border border-[#285e61]" :
              color === "purple" ? "bg-[#f5f0ff] border border-[#553c9a]" :
              "bg-[#f0f0f0] border border-[#4a5568]"
            } ${activeTheme === color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
            aria-label={`${color} theme`}
          />
        ))}
      </div>
  

      {/* Header Section */}
      <header className={`${theme.header} p-6 text-center`}>
        <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-wide">{header.name}</h1>
      </header>

      {/* Contact Bar */}
      <div className={`${theme.contactBar} ${theme.contactText} p-4 flex justify-center flex-wrap gap-8`}>
        <div className="flex items-center">
          <span className="mr-2">📧</span>
          {header.email}
        </div>
        <div className="flex items-center">
          <span className="mr-2">📞</span>
          {header.phone}
        </div>
        <div className="flex items-center">
          <span className="mr-2">📍</span>
          {header.city}, {header.country} {header.zipcode}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Summary */}
        <Section title="SUMMARY" theme={theme}>
          <p className="text-gray-600 leading-relaxed">{about}</p>
        </Section>

        {/* Skills */}
        <Section title="SKILLS" theme={theme}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-start">
                <span className={`mr-2 ${theme.highlight}`}>•</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="EXPERIENCE" theme={theme}>
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
        <Section title="EDUCATION AND TRAINING" theme={theme}>
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
          <Section title="CERTIFICATIONS" theme={theme}>
            {certificates.map((cert, index) => (
              <div key={index} className="mb-3">
                <h4 className={`font-medium ${theme.highlight}`}>{cert.name}</h4>
                {cert.date && <p className="text-sm text-gray-500">{cert.date}</p>}
                {cert.link && (
                  <a href={cert.link} className="text-sm text-gray-500 hover:underline">
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <Section title="ACHIEVEMENTS" theme={theme}>
            {achievements.map((ach, index) => (
              <div key={index} className="mb-3 flex">
                <span className={`mr-2 ${theme.highlight}`}>•</span>
                <div>
                  <span className="font-medium">{ach.title}</span>
                  {ach.description && (
                    <p className="text-gray-600">{ach.description}</p>
                  )}
                  {ach.date && (
                    <p className="text-gray-400 text-sm">{ach.date}</p>
                  )}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Volunteering */}
        {Volunteering.length > 0 && (
          <Section title="VOLUNTEER EXPERIENCE" theme={theme}>
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
          <Section title="INTERESTS" theme={theme}>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span 
                  key={index}
                  className={`${theme.skillBg} ${theme.skillText} text-sm px-3 py-1 rounded-full`}
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
    <h2 className={`text-xl font-bold mb-3 ${theme.sectionTitle} border-b pb-1`}>
      {title}
    </h2>
    {children}
  </div>
);

// Experience Item Component
const ExperienceItem = ({ title, company, location, duration, description, theme }) => (
  <div className="mb-6">
    <div className="flex justify-between items-start mb-1 flex-wrap">
      <h3 className="font-medium text-gray-800 italic">{company}, {location}</h3>
      <span className="text-sm text-gray-600">{duration}</span>
    </div>
    <p className={`font-semibold ${theme.highlight} mb-2`}>{title}</p>
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

export default Template4;