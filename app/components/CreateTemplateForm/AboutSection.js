"use client"
import React from "react";

const AboutSection = ({ about, handleChange }) => {
  return (
    
    <div className="relative group bg-gradient-to-br from-purple-900/40 to-cyan-900/30 p-6 rounded-2xl border-2 border-purple-500/40 shadow-cyber">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-lg"></div>
        <div className="relative z-10">
        <h3 className="text-xl font-mono font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ About
        </h3>
        
      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
      
      </label>
      <textarea
        id="about"
        name="about"
        value={about}
        onChange={(e) => handleChange(e)}
        className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                         text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                         focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                
        rows="4"
      />
       </div>
    </div>
  );
};

export default AboutSection;