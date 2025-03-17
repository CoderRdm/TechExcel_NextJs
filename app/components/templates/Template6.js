"use client";
import React, { useState } from "react";

const Template6 = ({
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
      sidebar: "bg-[#004d40]",
      contactBar: "bg-[#e0f2f1]",
      contactText: "text-[#004d40]",
      sectionTitle: "text-[#004d40] border-b-[#004d40]",
      highlight: "text-[#004d40]",
    },
    blue: {
      sidebar: "bg-[#0d47a1]",
      contactBar: "bg-[#e3f2fd]",
      contactText: "text-[#0d47a1]",
      sectionTitle: "text-[#0d47a1] border-b-[#0d47a1]",
      highlight: "text-[#0d47a1]",
    },
    purple: {
      sidebar: "bg-[#4a148c]",
      contactBar: "bg-[#f3e5f5]",
      contactText: "text-[#4a148c]",
      sectionTitle: "text-[#4a148c] border-b-[#4a148c]",
      highlight: "text-[#4a148c]",
    },
    green: {
      sidebar: "bg-[#1b5e20]",
      contactBar: "bg-[#e8f5e9]",
      contactText: "text-[#1b5e20]",
      sectionTitle: "text-[#1b5e20] border-b-[#1b5e20]",
      highlight: "text-[#1b5e20]",
    },
    burgundy: {
      sidebar: "bg-[#880e4f]",
      contactBar: "bg-[#fce4ec]",
      contactText: "text-[#880e4f]",
      sectionTitle: "text-[#880e4f] border-b-[#880e4f]",
      highlight: "text-[#880e4f]",
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
              color === "teal" ? "bg-[#004d40]" :
              color === "blue" ? "bg-[#0d47a1]" :
              color === "purple" ? "bg-[#4a148c]" :
              color === "green" ? "bg-[#1b5e20]" :
              "bg-[#880e4f]"
            } ${activeTheme === color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
            aria-label={`${color} theme`}
          />
        ))}
      </div>
      
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className={`${theme.sidebar} w-full md:w-1/6 min-h-screen`}>
          {/* Pattern or design could be added here */}
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-5/6 flex flex-col">
          {/* Header Section */}
          <div className="py-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800">{header?.name || "YOUR NAME"}</h1>
          </div>
          
          <div className="px-8 pb-8">
            {/* Summary */}
            <Section title="SUMMARY" theme={theme}>
              <p className="text-gray-600 leading-relaxed">{about || ""}</p>
            </Section>
            
            {/* Experience */}
            <Section title="EXPERIENCE" theme={theme}>
              {experiences.length > 0 ? experiences.map((exp, index) => (
                <ExperienceItem 
                  key={index}
                  title={exp.jobtitle}
                  company={exp.company}
                  location={exp.country}
                  duration={`${exp.startDate} - ${exp.endDate || 'Present'}`}
                  description={exp.description}
                  theme={theme}
                />
              )) : (
                <>
                  <ExperienceItem
                    title="Retail Sales Associate"
                    company="ZARA"
                    location="New Delhi, India"
                    duration="February 2017 - Current"
                    description={[
                      "Exceeded monthly sales 10% by effectively upselling and cross-selling products to maximize profitability.",
                      "Prevented losses by leveraging awareness, attention to detail, and integrity to identify and investigate concerns.",
                      "Processed payments and maintained accurate drawers to meet financial targets."
                    ]}
                    theme={theme}
                  />
                  <ExperienceItem
                    title="Barista"
                    company="Dunkin' Donuts"
                    location="New Delhi, India"
                    duration="March 2015 - January 2017"
                    description={[
                      "Upsold seasonal drinks and pastries, boosting average store sales by 1,000 weekly.",
                      "Managed transaction logs of over 300 customers daily with efficient, high-quality customer service.",
                      "Trained staff of 15 baristas in new smoothie program offerings and procedures.",
                      "Developed creative and appealing latte art techniques and instructed coworkers in method."
                    ]}
                    theme={theme}
                  />
                </>
              )}
            </Section>
          </div>
        </div>
        
        {/* Right Column (Contact and Skills) */}
        <div className="w-full md:w-2/5 px-8 pb-8">
          {/* Contact Information */}
          <div className={`${theme.contactBar} ${theme.contactText} p-4 mb-6 rounded`}>
            <h2 className={`text-lg font-bold uppercase mb-3 ${theme.sectionTitle}`}>
              CONTACT
            </h2>
            <div className="flex items-center mb-2">
              <span className="mr-2">📞</span>
              {header?.phone || "+91 98765 43210"}
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">📧</span>
              {header?.email || "your.email@example.com"}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              {header?.city || "New Delhi"}, {header?.country || "India"} {header?.zipcode || "110024"}
            </div>
          </div>
          
          {/* Skills */}
          <Section title="SKILLS" theme={theme}>
            <div className="flex flex-col gap-2">
              {skills.length > 0 ? skills.map((skill, index) => (
                <div key={index} className="flex items-start">
                  <span className={`mr-2 ${theme.highlight}`}>•</span>
                  <span>{skill.name}</span>
                </div>
              )) : (
                <>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Sales reporting</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>POS system operation</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Sales presentations</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Teamwork</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Inventory management</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Accurate money handling</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Documentation and record keeping</span>
                  </div>
                  <div className="flex items-start">
                    <span className={`mr-2 ${theme.highlight}`}>•</span>
                    <span>Retail merchandising expertise</span>
                  </div>
                </>
              )}
            </div>
          </Section>
          
          {/* Education */}
          <Section title="EDUCATION AND TRAINING" theme={theme}>
            {educations.length > 0 ? educations.map((edu, index) => (
              <EducationItem
                key={index}
                year={edu.graduationyear}
                degree={`${edu.degree} in ${edu.field}`}
                institution={edu.institute}
                location={edu.location}
                theme={theme}
              />
            )) : (
              <EducationItem
                year="2015"
                degree="Diploma in Financial Accounting"
                institution="Nalanda Software Institute & Oxford School of English"
                location="New Delhi, India"
                theme={theme}
              />
            )}
          </Section>
        </div>
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

export default Template6;