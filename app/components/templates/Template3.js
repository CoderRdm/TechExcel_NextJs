"use client";
import React, { useState, useRef, useEffect } from "react";
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

// SortableSection component for draggable sections
const SortableSection = ({ section, activeColor, renderContent }) => {
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
    <div 
      ref={setNodeRef} 
      style={style} 
      className="mb-8 border border-transparent hover:border-gray-200 rounded-md p-1 cursor-move"
      {...attributes}
      {...listeners}
    >
      <h2 className={`text-xl font-semibold ${activeColor.text} uppercase mb-3 border-b ${activeColor.border} pb-1 flex justify-between`}>
        {section.title}
        <span className="text-sm ml-2 opacity-50 hover:opacity-100">
          <div className="flex flex-col items-center">
            {/* <div className={`w-6 h-1 ${activeColor.bg} rounded-full mb-1`}></div>
            <div className={`w-6 h-1 ${activeColor.bg} rounded-full`}></div> */}
          </div>
        </span>
      </h2>
      {renderContent(section.id)}
    </div>
  );
};

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
  interests = [],
  skills = [],
  certificates = [],
}) => {
  const [activeColor, setActiveColor] = useState({
    name: "Emerald",
    bg: "bg-emerald-600",
    text: "text-emerald-700",
    border: "border-emerald-700"
  });

  // Initialize sections with their data and visibility
  const initialLeftSections = [
    { id: "summary", title: "Summary", visible: !!about },
    { id: "skills", title: "Skills", visible: skills.length > 0 },
    { id: "education", title: "Education and Training", visible: educations.length > 0 },
    { id: "certificates", title: "Certificates", visible: certificates.length > 0 },
    { id: "interests", title: "Interests", visible: interests.length > 0 },
  ];

  const initialRightSections = [
    { id: "experience", title: "Experience", visible: experiences.length > 0 },
    { id: "volunteering", title: "Volunteering", visible: volunteering.length > 0 },
    { id: "achievements", title: "Achievements", visible: achievements.length > 0 },
  ];

  const [leftSections, setLeftSections] = useState(initialLeftSections);
  const [rightSections, setRightSections] = useState(initialRightSections);
  const initialRenderRef = useRef(true);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle visibility changes based on props
  useEffect(() => {
    // Skip the first render
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    // Update left sections visibility
    const updatedLeftSections = leftSections.map(section => {
      let visible = true;
      switch (section.id) {
        case "summary": visible = !!about; break;
        case "skills": visible = skills.length > 0; break;
        case "education": visible = educations.length > 0; break;
        case "certificates": visible = certificates.length > 0; break;
        case "interests": visible = interests.length > 0; break;
        default: visible = true;
      }
      return { ...section, visible };
    });
    
    // Update right sections visibility
    const updatedRightSections = rightSections.map(section => {
      let visible = true;
      switch (section.id) {
        case "experience": visible = experiences.length > 0; break;
        case "volunteering": visible = volunteering.length > 0; break;
        case "achievements": visible = achievements.length > 0; break;
        default: visible = true;
      }
      return { ...section, visible };
    });
    
    // Only update state if visibility has actually changed
    const hasLeftVisibilityChanged = leftSections.some((section, index) => 
      section.visible !== updatedLeftSections[index].visible
    );
    
    const hasRightVisibilityChanged = rightSections.some((section, index) => 
      section.visible !== updatedRightSections[index].visible
    );
    
    if (hasLeftVisibilityChanged) {
      setLeftSections(updatedLeftSections);
    }
    
    if (hasRightVisibilityChanged) {
      setRightSections(updatedRightSections);
    }
  }, [about, skills.length, educations.length, certificates.length, interests.length, 
      experiences.length, volunteering.length, achievements.length]);

  // Handle drag end for left column
  const handleLeftDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setLeftSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle drag end for right column
  const handleRightDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setRightSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Render left section content
  const renderLeftSectionContent = (sectionId) => {
    switch (sectionId) {
      case "summary":
        return <p className="text-gray-700">{about}</p>;
      
      case "skills":
        return (
          <ul className="list-disc pl-5 text-gray-700">
            {skills.map((skill, index) => (
              <li key={index} className="mb-1">
                {skill.name}
              </li>
            ))}
          </ul>
        );
      
      case "education":
        return (
          <>
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
          </>
        );
      
      case "certificates":
        return (
          <>
            {certificates.map((cert, index) => (
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
          </>
        );
      
      case "interests":
        return (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded"
              >
                {interest.name}
              </span>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render right section content
  const renderRightSectionContent = (sectionId) => {
    switch (sectionId) {
      case "experience":
        return (
          <>
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
          </>
        );
      
      case "volunteering":
        return (
          <>
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
          </>
        );
      
      case "achievements":
        return (
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
        );
      
      default:
        return null;
    }
  };

  // Filter visible sections
  const visibleLeftSections = leftSections.filter(section => section.visible);
  const visibleRightSections = rightSections.filter(section => section.visible);

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
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleLeftDragEnd}
          >
            <SortableContext
              items={visibleLeftSections.map(section => section.id)}
              strategy={verticalListSortingStrategy}
            >
              {visibleLeftSections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  activeColor={activeColor}
                  renderContent={renderLeftSectionContent}
                />
              ))}
            </SortableContext>
          </DndContext>
          
        </div>

        {/* Right column - wider */}
        <div className="w-full md:w-2/3 p-6">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleRightDragEnd}
          >
            <SortableContext
              items={visibleRightSections.map(section => section.id)}
              strategy={verticalListSortingStrategy}
            >
              {visibleRightSections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  activeColor={activeColor}
                  renderContent={renderRightSectionContent}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;