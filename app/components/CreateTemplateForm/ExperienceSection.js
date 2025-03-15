"use client";
import React from "react";

const ExperienceSection = ({ experiences, handleChange, addExperience }) => {
  return (
    <div className="relative group bg-gradient-to-br from-purple-900/40 to-cyan-900/30 p-6 rounded-2xl border-2 border-purple-500/40 shadow-cyber">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-lg"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-mono font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ EXPERIENCE
        </h3>

        {experiences.map((experience, index) => (
          <div key={index} className="relative mb-4 p-4 rounded-xl border border-purple-500/40 bg-gray-900/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`experience-jobtitle-${index}`}
                  name="jobtitle"
                  value={experience.jobtitle}
                  onChange={(e) => handleChange(e, "experiences", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="ENTER JOB TITLE"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>

              {/* Company */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`experience-company-${index}`}
                  name="company"
                  value={experience.company}
                  onChange={(e) => handleChange(e, "experiences", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="ENTER CORPORATION"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>

              {/* Country */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`experience-country-${index}`}
                  name="country"
                  value={experience.country}
                  onChange={(e) => handleChange(e, "experiences", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="ENTER COUNTRY"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>

              {/* Months */}
              <div className="relative neon-input-group">
                <input
                  type="number"
                  id={`experience-months-${index}`}
                  name="months"
                  value={experience.months}
                  onChange={(e) => handleChange(e, "experiences", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="DURATION (MONTHS)"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>
            </div>

            {/* Cybernetic Pattern for Experience Block */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
              backgroundImage: `linear-gradient(45deg, transparent 65%, rgba(34, 211, 238, 0.1) 75%, transparent 85%),
                              linear-gradient(-45deg, transparent 65%, rgba(192, 132, 252, 0.1) 75%, transparent 85%)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        ))}

    

        {/* Main Cybernetic Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `linear-gradient(45deg, transparent 65%, rgba(34, 211, 238, 0.1) 75%, transparent 85%),
                          linear-gradient(-45deg, transparent 65%, rgba(192, 132, 252, 0.1) 75%, transparent 85%)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
    </div>
  );
};

export default ExperienceSection;