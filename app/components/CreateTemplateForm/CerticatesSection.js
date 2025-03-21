import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const CertificatesSection = ({ certificates, handleChange, addCertificate }) => {
  // Track verification status for each certificate
  const [verificationState, setVerificationState] = useState({});
  

  // Handle verification process with actual backend API
  const verifyDocument = async (index, url) => {
    // Set status to verifying
    setVerificationState(prev => ({
      ...prev,
      [index]: { status: "verifying" }
    }));
    
   // In your verifyDocument function:
try {
  const response = await fetch('http://3.108.59.60/verify-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  
  const data = await response.json();
  console.log(data);
  
  if (data.success === true) {
    // Set verified status based on the API response
    setVerificationState(prev => ({
      ...prev,
      [index]: { 
        status: "verified",
        details: data.certificate
      }
    }));
  } else {
    // Handle error from API - this part needs to be updated
    setVerificationState(prev => ({
      ...prev,
      [index]: { 
        status: "error",
        message: data.certificate.error || "Not a valid certificate"
      }
    }));
  }
} 
 catch (error) {
      // Handle network or other errors
      setVerificationState(prev => ({
        ...prev,
        [index]: { 
          status: "error",
          message: "Connection error. Please try again." 
        }
      }));
    }
  };

  return (
    <div className="relative group bg-gradient-to-br from-purple-900/40 to-cyan-900/30 p-6 rounded-2xl border-2 border-purple-500/40 shadow-cyber">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-lg"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-mono font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ CERTIFICATIONS
        </h3>

        {certificates.map((certificate, index) => (
          <div key={index} className="relative mb-4 p-4 rounded-xl border border-purple-500/40 bg-gray-900/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              {/* Certificate Name */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`certificate-name-${index}`}
                  name="name"
                  value={certificate.name}
                  onChange={(e) => handleChange(e, "certificates", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="CREDENTIAL NAME"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>

              {/* Certificate Link */}
              <div className="relative neon-input-group">
                <input
                  type="text"
                  id={`certificate-link-${index}`}
                  name="credentialUrl"
                  value={certificate.credentialUrl}
                  onChange={(e) => handleChange(e, "certificates", index)}
                  className="w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-l-4 border-cyan-400/60 
                           text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
                           focus:border-purple-400 focus:bg-gray-900/90 transition-all"
                  placeholder="DATA LINK"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <span className="text-purple-400/60 text-sm font-mono">▼</span>
                </div>
              </div>
            </div>

            {/* Verification Button and Status */}
            <div className="flex items-center mt-2">
              <button
                onClick={() => verifyDocument(index, certificate.credentialUrl)}
                disabled={verificationState[index]?.status === "verifying" || verificationState[index]?.status === "verified"}
                className={`px-4 py-2 rounded-md text-sm font-mono flex items-center gap-2 transition-all
                          ${verificationState[index]?.status === "verified" 
                            ? "bg-green-500/20 text-green-300 border border-green-500/40" 
                            : verificationState[index]?.status === "verifying"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                              : "bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30"}`}
              >
                {verificationState[index]?.status === "verified" ? (
                  <>
                    <CheckCircle size={16} className="text-green-400" />
                    VERIFIED
                  </>
                ) : verificationState[index]?.status === "verifying" ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                    VERIFYING...
                  </>
                ) : (
                  "VERIFY DOCUMENT"
                )}
              </button>
              
              {verificationState[index]?.status === "verified" && (
                <span className="ml-3 text-xs text-green-300 font-mono">Document authenticity confirmed</span>
              )}
              
              {verificationState[index]?.status === "error" && (
                <span className="ml-3 text-xs text-red-300 font-mono">
                  {verificationState[index].message}
                </span>
              )}
            </div>

            {/* Display Provider and Title after verification */}
            {verificationState[index]?.status === "verified" && verificationState[index]?.details && (
              <div className="mt-4 p-3 rounded-lg border border-green-500/30 bg-green-900/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-green-300 font-mono mb-1">PROVIDER</span>
                    <span className="text-sm text-cyan-200 font-mono">
                      {verificationState[index].details.provider ? 
                       verificationState[index].details.provider.toUpperCase() : 
                       'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-green-300 font-mono mb-1">TITLE</span>
                    <span className="text-sm text-cyan-200 font-mono">
                      {verificationState[index].details.title || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}

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

export default CertificatesSection;