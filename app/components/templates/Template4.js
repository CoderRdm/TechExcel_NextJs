"use client";
import React from "react";
import Footer from "../TemplateFooter";

const Template1 = ({
  about,
  header,
  experiences = [],
  educations = [],
  Volunterring = [],
  achievements = [],
  interests = [],
  skills = [],
  certificates = [],
}) => {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-xl rounded-sm font-[Arial] text-gray-700">
      {/* Header Section */}
      <header className="text-center mb-8 border-b-2 border-blue-600 pb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{header.name}</h1>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            {header.city}, {header.country}
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
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* About */}
          <Section title="Professional Summary">
            <p className="text-gray-600 leading-relaxed">{about}</p>
          </Section>

          {/* Experience */}
          <Section title="Professional Experience">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={index}
                title={exp.jobtitle}
                company={exp.company}
                location={exp.country}
                duration={`${exp.months} months`}
              />
            ))}
          </Section>

          {/* Education */}
          <Section title="Education">
            {educations.map((edu, index) => (
              <EducationItem
                key={index}
                institution={edu.institute}
                degree={`${edu.degree} in ${edu.field}`}
                location={edu.location}
                year={edu.graduationyear}
              />
            ))}
          </Section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          <Section title="Core Competencies">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </Section>

          {/* Certifications */}
          <Section title="Certifications">
            {certificates.map((cert, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-semibold text-blue-700">{cert.name}</h4>
                <a href={cert.link} className="text-sm text-gray-500 hover:underline">
                  View Credential
                </a>
              </div>
            ))}
          </Section>

          {/* Achievements */}
          <Section title="Key Achievements">
            <ul className="space-y-4">
              {achievements.map((ach, index) => (
                <li key={index} className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="font-semibold">{ach.title}</span>
                  </div>
                  {ach.description && (
                    <p className="ml-6 text-gray-600">{ach.description}</p>
                  )}
                  {ach.date && (
                    <p className="ml-6 text-gray-400 text-sm">{ach.date}</p>
                  )}
                </li>
              ))}
            </ul>
          </Section>


          {/* Volunteering */}
          <Section title="Volunteer Experience">
            {Volunterring.map((vol, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-semibold">{vol.institute}</h4>
                <p className="text-sm text-gray-600">{vol.location}</p>
                <p className="text-sm text-gray-500">{vol.duration}</p>
              </div>
            ))}
          </Section>

          {/* Interests */}
          <Section title="Interests">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {interest.name}
                </span>
              ))}
            </div>
          </Section>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-blue-800 mb-3 uppercase tracking-wide border-b border-blue-100 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

// Experience Item Component
const ExperienceItem = ({ title, company, location, duration }) => (
  <div className="mb-5">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <span className="text-sm text-gray-600">{duration}</span>
    </div>
    <div className="flex justify-between items-start">
      <p className="text-blue-700 font-medium">{company}</p>
      <span className="text-sm text-gray-600">{location}</span>
    </div>
  </div>
);

// Education Item Component
const EducationItem = ({ institution, degree, location, year }) => (
  <div className="mb-5">
    <h3 className="font-semibold text-gray-800">{institution}</h3>
    <p className="text-blue-700 text-sm mb-1">{degree}</p>
    <div className="flex justify-between text-sm text-gray-600">
      <span>{location}</span>
      <span>{year}</span>
    </div>
  </div>
);

export default Template1;