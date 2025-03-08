"use client";
import React from "react";

const VolunteeringSection = ({ volunteering, handleChange, addVolunteering }) => {
  return (
    <div className="relative group bg-gradient-to-br from-purple-900/40 to-cyan-900/30 p-6 rounded-2xl border-2 border-purple-500/40 shadow-cyber">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-lg"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-mono font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ VOLUNTEERING
        </h3>

        {volunteering.map((volunteer, index) => (
          <div key={index} className="relative mb-4 p-4 rounded-xl border border-purple-500/40 bg-gray-900/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Organization */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`volunteer-institute-${index}`}
                  name="institute"
                  value={volunteer.institute}
                  onChange={(e) => handleChange(e, "volunteering", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="SYNDICATE"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>

              {/* Location */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`volunteer-location-${index}`}
                  name="location"
                  value={volunteer.location}
                  onChange={(e) => handleChange(e, "volunteering", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="ZONE"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>

              {/* Duration */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`volunteer-duration-${index}`}
                  name="duration"
                  value={volunteer.duration}
                  onChange={(e) => handleChange(e, "volunteering", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="SERVICE PERIOD"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>
            </div>

            {/* Cybernetic Pattern */}
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

export default VolunteeringSection;