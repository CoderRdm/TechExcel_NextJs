// "use client";
// import React, { useState } from "react";
// import Template1 from "../templates/Template1";
// import Template2 from "../templates/Template2"; // Import other templates
// import Template3 from "../templates/Template3"; // Import other templates

// const PreviewSection = ({
//   about,
//   header,
//   experiences,
//   educations,
//   Volunterring,
//   achievements,
//   Interests,
//   skills,
//   Certificates,
//   formData,
//   formatDuration,
// }) => {
//   // State to track the selected template
//   const [selectedTemplate, setSelectedTemplate] = useState("Template1");

//   // Function to handle template selection
//   const handleTemplateChange = (template) => {
//     setSelectedTemplate(template);
//   };

//   // Render the selected template dynamically
//   const renderSelectedTemplate = () => {
//     switch (selectedTemplate) {
//       case "Template1":
//         return (
//           <Template1
//             about={about}
//             header={header}
//             experiences={experiences}
//             educations={educations}
//             Volunterring={Volunterring}
//             achievements={achievements}
//             Interests={Interests}
//             skills={skills}
//             Certificates={Certificates}
//           />
//         );
//       case "Template2":
//         return (
//           <Template2
//             about={about}
//             header={header}
//             experiences={experiences}
//             educations={educations}
//             Volunterring={Volunterring}
//             achievements={achievements}
//             Interests={Interests}
//             skills={skills}
//             Certificates={Certificates}
//           />
//         );
//       case "Template3":
//         return (
//           <Template3
//             about={about}
//             header={header}
//             experiences={experiences}
//             educations={educations}
//             Volunterring={Volunterring}
//             achievements={achievements}
//             Interests={Interests}
//             skills={skills}
//             Certificates={Certificates}
//           />
//         );
//       default:
//         return <Template1 {...formData} />;
//     }
//   };

//   return (
//     <div className="w-full lg:w-1/2">
//       <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-900">Live Preview</h2>

//         {/* Template Selector */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Template
//           </label>
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleTemplateChange("Template1")}
//               className={`px-4 py-2 text-sm font-medium rounded ${
//                 selectedTemplate === "Template1"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Template 1
//             </button>
//             <button
//               onClick={() => handleTemplateChange("Template2")}
//               className={`px-4 py-2 text-sm font-medium rounded ${
//                 selectedTemplate === "Template2"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Template 2
//             </button>
//             <button
//               onClick={() => handleTemplateChange("Template3")}
//               className={`px-4 py-2 text-sm font-medium rounded ${
//                 selectedTemplate === "Template3"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Template 3
//             </button>
//           </div>
//         </div>

//         {/* Render the Selected Template */}
//         <div className="border border-gray-300 p-6 rounded-lg bg-white h-full overflow-y-auto max-h-screen">
//           {renderSelectedTemplate()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewSection;
"use client";
import React, { useState } from "react";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";

const PreviewSection = ({
  about = "",
  header = {},
  experiences = [],
  educations = [],
  volunteering = [],
  achievements = [],
  interests = [],
  skills = [],
  certificates = [],
  formData,
  formatDuration,
  selectedTemplate,
  onTemplateChange
}) => {
  const handleTemplateChange = (template) => {
    onTemplateChange(template);
  };

  const renderSelectedTemplate = () => {
    const commonProps = {
      about,
      header,
      experiences,
      educations,
      volunteering,
      achievements,
      interests,
      skills,
      certificates,
    };

    const templates = {
      Template1: <Template1 {...commonProps} />,
      Template2: <Template2 {...commonProps} />,
      Template3: <Template3 {...commonProps} />,
    };

    return templates[selectedTemplate] || <Template1 {...commonProps} />;
  };

  return (
    <div className="w-full">
      {/* Cyberpunk Template Selector */}
      <div className="mb-6 relative group">
        <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-xl animate-pulse-slow"></div>
        <div className="relative z-10 p-1 rounded-xl bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30">
          <div className="flex flex-wrap gap-2 p-2 bg-gray-900/80 rounded-lg backdrop-blur-sm">
            {["Template1", "Template2", "Template3"].map((template) => (
              <button
                key={template}
                onClick={() => handleTemplateChange(template)}
                className={`px-4 py-2 text-sm font-mono font-bold rounded-lg transition-all duration-300
                  ${
                    selectedTemplate === template
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-cyber"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700/50 hover:text-cyan-400"
                  }
                  hover:scale-105 hover:shadow-cyber-hover`}
              >
                <span className="text-cyan-400">▷</span> {template.replace("Template", "PROTOCOL ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Holographic Preview Display */}
      <div className="relative bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-2xl border-2 border-cyan-400/40 shadow-cyber-lg">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm"></div>
        <div className="relative z-10 p-1">
          <div 
            id="holographic-display"
            className="bg-gray-900 rounded-xl p-4 shadow-inner-cyber max-h-[700px] overflow-y-auto
            scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-800"
          >
            {renderSelectedTemplate()}
          </div>
        </div>
      </div>

      {/* System Notification Panel */}
      <div className="mt-4 p-4 bg-cyan-900/20 rounded-xl border border-cyan-500/30 animate-flicker">
        <div className="flex items-center text-sm text-cyan-300 font-mono">
          <svg className="h-5 w-5 mr-2 text-purple-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            WARNING: Template modification may affect neural compatibility
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;