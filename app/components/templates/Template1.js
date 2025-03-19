"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableSection = ({ section, theme, renderContent }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div ref={setNodeRef} style={style} className="border border-transparent hover:border-gray-200 rounded-md p-1 mb-6">
      <div>
        {/* Make the entire header draggable */}
        <div 
          className="flex items-center justify-between cursor-move"
          {...attributes}
          {...listeners}
        >
          <h2 className={`text-xl font-bold mb-3 ${theme.sectionTitle} border-b pb-1 flex-grow`}>
            {section.title}
          </h2>
          <span className="text-sm ml-2 opacity-50 hover:opacity-100">
            <div className="flex flex-col items-center">
              {/* <div className={`w-6 h-1 ${theme.dragHandle} rounded-full mb-1`}></div>
              <div className={`w-6 h-1 ${theme.dragHandle} rounded-full`}></div> */}
            </div>
          </span>
        </div>
        {renderContent(section.id, section.height)}
      </div>
    </div>
  );
};
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
      scrollbar: "scrollbar-thumb-[#333333] scrollbar-track-[#e0eaea]",
      dragHandle: "bg-[#333333]",
    },
    blue: {
      header: "bg-[#e6f0ff]",
      contactBar: "bg-[#2c5282]",
      contactText: "text-white",
      sectionTitle: "text-[#2c5282] border-b-[#2c5282]",
      highlight: "text-[#2c5282]",
      skillBg: "bg-[#e6f0ff]",
      skillText: "text-[#2c5282]",
      scrollbar: "scrollbar-thumb-[#2c5282] scrollbar-track-[#e6f0ff]",
      dragHandle: "bg-[#2c5282]",
    },
    teal: {
      header: "bg-[#e6fffa]",
      contactBar: "bg-[#285e61]",
      contactText: "text-white",
      sectionTitle: "text-[#285e61] border-b-[#285e61]",
      highlight: "text-[#285e61]",
      skillBg: "bg-[#e6fffa]",
      skillText: "text-[#285e61]",
      scrollbar: "scrollbar-thumb-[#285e61] scrollbar-track-[#e6fffa]",
      dragHandle: "bg-[#285e61]",
    },
    purple: {
      header: "bg-[#f5f0ff]",
      contactBar: "bg-[#553c9a]",
      contactText: "text-white",
      sectionTitle: "text-[#553c9a] border-b-[#553c9a]",
      highlight: "text-[#553c9a]",
      skillBg: "bg-[#f5f0ff]",
      skillText: "text-[#553c9a]",
      scrollbar: "scrollbar-thumb-[#553c9a] scrollbar-track-[#f5f0ff]",
      dragHandle: "bg-[#553c9a]",
    },
    gray: {
      header: "bg-[#f0f0f0]",
      contactBar: "bg-[#4a5568]",
      contactText: "text-white",
      sectionTitle: "text-[#4a5568] border-b-[#4a5568]",
      highlight: "text-[#4a5568]",
      skillBg: "bg-[#f0f0f0]",
      skillText: "text-[#4a5568]",
      scrollbar: "scrollbar-thumb-[#4a5568] scrollbar-track-[#f0f0f0]",
      dragHandle: "bg-[#4a5568]",
    }
  };

  const initialRenderRef = useRef(true);

  const [activeTheme, setActiveTheme] = useState("mint");
  const theme = colorThemes[activeTheme];

  
  // Initialize sections with their data and visibility
  const initialSections = [
    { id: "summary", title: "SUMMARY", content: "about", visible: true, height: "auto" },
    { id: "skills", title: "SKILLS", content: "skills", visible: skills.length > 0, height: "48" },
    { id: "experience", title: "EXPERIENCE", content: "experiences", visible: experiences.length > 0, height: "64" },
    { id: "education", title: "EDUCATION AND TRAINING", content: "educations", visible: educations.length > 0, height: "48" },
    { id: "certifications", title: "CERTIFICATIONS", content: "certificates", visible: certificates.length > 0, height: "48" },
    { id: "achievements", title: "ACHIEVEMENTS", content: "achievements", visible: achievements.length > 0, height: "48" },
    { id: "volunteering", title: "VOLUNTEER EXPERIENCE", content: "Volunteering", visible: Volunteering.length > 0, height: "48" },
    { id: "interests", title: "INTERESTS", content: "interests", visible: interests.length > 0, height: "32" },
  ];

  const [sections, setSections] = useState(initialSections);
  
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Key fix: Add proper dependency array and use a ref to prevent infinite loop
  useEffect(() => {
    // Skip the first render because sections are already initialized properly
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    // Create new visibility state based on props
    const updatedSections = sections.map(section => {
      let visible = true;
      switch (section.id) {
        case "skills": visible = skills.length > 0; break;
        case "experience": visible = experiences.length > 0; break;
        case "education": visible = educations.length > 0; break;
        case "certifications": visible = certificates.length > 0; break;
        case "achievements": visible = achievements.length > 0; break;
        case "volunteering": visible = Volunteering.length > 0; break;
        case "interests": visible = interests.length > 0; break;
        default: visible = true;
      }
      return { ...section, visible };
    });
    
    // Only update state if visibility has actually changed
    const hasVisibilityChanged = sections.some((section, index) => 
      section.visible !== updatedSections[index].visible
    );
    
    if (hasVisibilityChanged) {
      setSections(updatedSections);
    }
  }, [skills.length, experiences.length, educations.length, certificates.length, 
      achievements.length, Volunteering.length, interests.length]);
  // Note: Added .length to dependencies rather than the arrays themselves

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderSectionContent = (sectionId, maxHeight) => {
    switch (sectionId) {
      case "summary":
        return <p className="text-gray-600 leading-relaxed">{about}</p>;
      
      case "skills":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-start">
                  <span className={`mr-2 ${theme.highlight}`}>•</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "experience":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
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
          </div>
        );
      
      case "education":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
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
          </div>
        );
      
      case "certifications":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
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
          </div>
        );
      
      case "achievements":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
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
          </div>
        );
      
      case "volunteering":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
            {Volunteering.map((vol, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-medium">{vol.institute}</h4>
                <p className="text-sm text-gray-600">{vol.location}</p>
                <p className="text-sm text-gray-500">{vol.duration}</p>
              </div>
            ))}
          </div>
        );
      
      case "interests":
        return (
          <div className={`max-h-${maxHeight} overflow-y-auto pr-2 scrollbar-thin ${theme.scrollbar}`}>
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
          </div>
        );
      
      default:
        return null;
    }
  };

  // Filter visible sections
  const visibleSections = sections.filter(section => section.visible);

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

      {/* Main Content - Draggable Sections */}
      <div className="p-6">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={visibleSections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
          >
            {visibleSections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                theme={theme}
                renderContent={renderSectionContent}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

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