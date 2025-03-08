"use client"
import React from "react";

const HeaderSection = ({ header, handleChange }) => {
  return (
    <div className="relative group bg-gradient-to-br from-purple-900/40 to-cyan-900/30 p-6 rounded-2xl border-2 border-purple-500/40 shadow-cyber">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-lg"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-mono font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ Header
        </h3>
        
        <div className="grid grid-cols-1 gap-5">
          {[
            { id: 'header-name', name: 'name', label: 'CALLSIGN', value: header.name },
            { id: 'header-city', name: 'city', label: 'ZONE', value: header.city },
            { id: 'header-country', name: 'country', label: 'SECTOR', value: header.country },
            { id: 'header-phone', name: 'phone', label: 'COM-LINK', value: header.phone },
            { id: 'header-email', name: 'email', label: 'DATA-PIPE', value: header.email }
          ].map((field) => (
            <div key={field.id} className="relative neon-input-group">
              <input
                type="text"
                id={field.id}
                name={field.name}
                value={field.value}
                onChange={(e) => handleChange(e, "header")}
                className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                         text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                         focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                placeholder={`ENTER ${field.label}`}
              />
              <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                <span className="text-purple-400/60 text-sm font-mono">▼</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cybernetic Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `linear-gradient(45deg, transparent 65%, rgba(34, 211, 238, 0.1) 75%, transparent 85%),
                          linear-gradient(-45deg, transparent 65%, rgba(192, 132, 252, 0.1) 75%, transparent 85%)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
    </div>
  );
};

export default HeaderSection;