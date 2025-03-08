"use client"
import React, { useState } from 'react';

const CyberpunkSectionTabs = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'about', label: 'ABOUT' },
    { id: 'header', label: 'PROFILE' },
    { id: 'experiences', label: 'EXPERIENCE' },
    { id: 'educations', label: 'EDUCATION' },
    { id: 'volunteering', label: 'VOLUNTEER' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'interests', label: 'INTERESTS' },
    { id: 'certificates', label: 'CERTIFICATES' },
    { id: 'skills', label: 'SKILLS' }
  ];

  return (
    <div className="relative mb-8 w-full overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-gray-800/60 border border-purple-500/30 rounded-xl overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(192, 132, 252, 0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(192, 132, 252, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Scrollable Tab Bar */}
      <div className="relative flex overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            className={`flex-shrink-0 relative px-6 py-3 mx-1 cursor-pointer transition-all duration-300 group`}
            onClick={() => setActiveSection(section.id)}
          >
            {/* Active Indicator */}
            {activeSection === section.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-cyan-500/70 rounded-lg shadow-lg shadow-purple-500/30 z-0 animate-pulse-slow"></div>
            )}
            
            {/* Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${activeSection !== section.id ? 'z-0' : '-z-10'}`}></div>
            
            {/* Tab Content */}
            <div className="relative z-10 flex items-center">
              <span className={`text-sm font-bold font-mono ${activeSection === section.id ? 'text-white' : 'text-gray-300'}`}>
                {section.label}
              </span>
              
              {/* Circuit Lines */}
              {index < sections.length - 1 && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-px bg-cyan-400/50"></div>
              )}
            </div>
            
            {/* Glowing Dot Indicator */}
            {activeSection === section.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/70"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Scan Line Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
      
      {/* Edge Fade Effect */}
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default CyberpunkSectionTabs;