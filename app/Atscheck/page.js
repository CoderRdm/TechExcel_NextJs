"use client"
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import * as THREE from 'three';

export default function ATSChecker() {
  // State management
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [step, setStep] = useState(1); // 1 = job description, 2 = file upload
  
  // Three.js refs
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const frameIdRef = useRef(null);
  
  // Animation effect for content
  useEffect(() => {
    setAnimate(true);
  }, []);
  
  // Three.js setup and animation
  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);
    
    // Set up canvas styling
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1'; // Behind content
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100vh';
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Increased particle count for more visual impact
    
    // Create positions array (3 values per vertex - x, y, z)
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Create particles with random positions and colors
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Positions
      positions[i] = (Math.random() - 0.5) * 80; // Wider spread on x-axis
      positions[i + 1] = (Math.random() - 0.5) * 80; // Wider spread on y-axis
      positions[i + 2] = (Math.random() - 0.5) * 80; // Deeper z-depth
      
      // More vibrant colors - purples, pinks, and blues
      colors[i] = Math.random() * 0.5 + 0.5; // r (more purple)
      colors[i + 1] = Math.random() * 0.3; // g
      colors[i + 2] = Math.random() * 0.8 + 0.2; // b (more intense blue)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Particle material - larger particles for more visual impact
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2, // Larger particle size
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Create particle mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Brighter light
    scene.add(ambientLight);
    
    // Create floating document shapes - more of them and varied sizes
    const documentGeometries = [
      new THREE.PlaneGeometry(1, 1.3),
      new THREE.PlaneGeometry(1.2, 1.5),
      new THREE.PlaneGeometry(0.8, 1.1)
    ];
    
    const documentMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x8a2be2, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0xff69b4, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x9370db, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0x4b0082, transparent: true, opacity: 0.4 }),
      new THREE.MeshBasicMaterial({ color: 0xda70d6, transparent: true, opacity: 0.4 })
    ];
    
    // Create multiple document objects - more documents for a richer scene
    const documents = [];
    for (let i = 0; i < 30; i++) {
      const geometryIndex = i % documentGeometries.length;
      const materialIndex = i % documentMaterials.length;
      const geometry = documentGeometries[geometryIndex];
      const material = documentMaterials[materialIndex];
      const document = new THREE.Mesh(geometry, material);
      document.position.x = (Math.random() - 0.5) * 50;
      document.position.y = (Math.random() - 0.5) * 50;
      document.position.z = (Math.random() - 0.5) * 20;
      document.rotation.x = Math.random() * Math.PI;
      document.rotation.y = Math.random() * Math.PI;
      
      // Save the original positions for animation reference
      document.userData = {
        originalX: document.position.x,
        originalY: document.position.y,
        originalZ: document.position.z,
        rotationSpeedX: (Math.random() - 0.5) * 0.02, // Faster rotation
        rotationSpeedY: (Math.random() - 0.5) * 0.02, // Faster rotation
        floatSpeed: (Math.random() * 0.8 + 0.2) * 0.005 // More varied floating
      };
      
      scene.add(document);
      documents.push(document);
    }
    
    // Add some glowing orbs/nodes for visual interest
    const orbGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const orbMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xff1493, transparent: true, opacity: 0.7 }), // Deep pink
      new THREE.MeshBasicMaterial({ color: 0x4169e1, transparent: true, opacity: 0.7 }), // Royal blue
      new THREE.MeshBasicMaterial({ color: 0x9400d3, transparent: true, opacity: 0.7 })  // Dark violet
    ];
    
    const orbs = [];
    for (let i = 0; i < 15; i++) {
      const material = orbMaterials[i % orbMaterials.length];
      const orb = new THREE.Mesh(orbGeometry, material);
      orb.position.x = (Math.random() - 0.5) * 40;
      orb.position.y = (Math.random() - 0.5) * 40;
      orb.position.z = (Math.random() - 0.5) * 15;
      orb.userData = {
        originalX: orb.position.x,
        originalY: orb.position.y,
        originalZ: orb.position.z,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        moveSpeed: Math.random() * 0.01 + 0.005,
        scale: Math.random() * 0.5 + 0.8
      };
      
      scene.add(orb);
      orbs.push(orb);
    }
    
    // Add connection lines between some orbs to create a network effect
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.2
    });
    
    const connections = [];
    
    // Create connections between some orbs
    for (let i = 0; i < orbs.length - 1; i++) {
      if (Math.random() > 0.5) {
        const nextIndex = (i + 1) % orbs.length;
        const pointsArray = [];
        pointsArray.push(orbs[i].position);
        pointsArray.push(orbs[nextIndex].position);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
        const line = new THREE.Line(lineGeometry, linesMaterial);
        scene.add(line);
        connections.push({line, startOrb: orbs[i], endOrb: orbs[nextIndex]});
      }
    }
    
    // Handle window resize
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleWindowResize);
    
    // Animation function
    const animateScene = () => {
      frameIdRef.current = requestAnimationFrame(animateScene);
      
      // Rotate particles with varying speed
      const time = Date.now() * 0.0001;
      particles.rotation.x = Math.sin(time) * 0.2;
      particles.rotation.y = Math.cos(time) * 0.2;
      
      // Animate documents
      documents.forEach(doc => {
        // Floating animation
        doc.position.y = doc.userData.originalY + Math.sin(Date.now() * doc.userData.floatSpeed) * 1.0;
        // Slow rotation
        doc.rotation.x += doc.userData.rotationSpeedX;
        doc.rotation.y += doc.userData.rotationSpeedY;
      });
      
      // Animate orbs - pulse and move
      orbs.forEach(orb => {
        const t = Date.now() * orb.userData.pulseSpeed;
        // Pulsing size
        const scale = orb.userData.scale + Math.sin(t) * 0.2;
        orb.scale.set(scale, scale, scale);
        // Floating movement
        orb.position.x = orb.userData.originalX + Math.sin(t * 0.7) * 1.5;
        orb.position.y = orb.userData.originalY + Math.cos(t * 0.5) * 1.5;
      });
      
      // Update connection lines
      connections.forEach(connection => {
        const pointsArray = [];
        pointsArray.push(connection.startOrb.position);
        pointsArray.push(connection.endOrb.position);
        connection.line.geometry.setFromPoints(pointsArray);
        connection.line.geometry.attributes.position.needsUpdate = true;
      });
      
      // Move camera slightly based on mouse position
      const normalizedMouseX = (window.mouseX || 0) / window.innerWidth * 2 - 1;
      const normalizedMouseY = (window.mouseY || 0) / window.innerHeight * 2 - 1;
      camera.position.x += (normalizedMouseX * 10 - camera.position.x) * 0.05; // More responsive camera
      camera.position.y += (-normalizedMouseY * 10 - camera.position.y) * 0.05; // More responsive camera
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    // Track mouse movement for camera effects
    const handleMouseMove = (event) => {
      window.mouseX = event.clientX;
      window.mouseY = event.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animateScene();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      documentGeometries.forEach(geometry => geometry.dispose());
      documentMaterials.forEach(material => material.dispose());
      orbGeometry.dispose();
      orbMaterials.forEach(material => material.dispose());
      linesMaterial.dispose();
      connections.forEach(connection => {
        connection.line.geometry.dispose();
      });
    };
  }, []);
  
  // Handle file drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      handleFileChange(selectedFile);
    }
  };
  
  // Handle file selection
  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    } else {
      setFile(null);
      setFileName('No file chosen');
      setError('Please select a PDF file');
    }
  };
  
  // Handle file input change
  const onFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);
    
    try {
      // Make sure to update the URL to match your backend deployment
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing your resume');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Move to next step (from job description to file upload)
  const nextStep = (e) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      setStep(2);
      setError('');
    } else {
      setError('Please enter a job description');
    }
  };
  
  // Go back to job description step
  const prevStep = () => {
    setStep(1);
  };
  
  // Generate random tips for job seekers to display in the sidebar
  const jobTips = [
    "Customize your resume for each job application to maximize ATS match",
    "Use industry-specific keywords from the job description",
    "Quantify your achievements with numbers when possible",
    "Keep formatting simple to ensure ATS compatibility",
    "Include a skills section with relevant technical competencies",
    "Avoid using tables, headers, footers or graphics in your resume",
    "Use standard section headings like 'Experience' and 'Education'",
    "Spell out acronyms at least once before abbreviating",
    "Save your resume as a PDF to maintain formatting",
    "File name should include your name and 'resume' for easy identification"
  ];
  
  // Select 3 random tips
  const randomTips = [...jobTips].sort(() => 0.5 - Math.random()).slice(0, 3);
  console.log(result);
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900/90 via-purple-800/90 to-pink-700/90">
      <Head>
        <title>Resume ATS Optimizer</title>
        <meta name="description" content="Optimize your resume to beat ATS systems and land more interviews" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </Head>
      
      {/* Three.js container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full"></div>
      
      {/* Content container - Full page layout */}
      <div className="relative h-screen w-full overflow-auto py-6 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-6">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 hover:from-pink-200 hover:to-indigo-200 transition-all duration-300">
              RESUME<span className="animate-pulse"> AI</span> OPTIMIZER
            </h1>
            <p className="mt-2 text-blue-100 text-xl font-light">Get past the algorithm. Land the interview. Win the job.</p>
          </div>
          
          {/* Main content - Two column layout for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar with tips */}
            <div className="lg:col-span-1">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-6 h-full">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 mb-4">
                  ATS Insider Tips
                </h2>
                <div className="space-y-6">
                  {randomTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <i className="fas fa-lightbulb text-yellow-300"></i>
                      </div>
                      <p className="text-indigo-100">{tip}</p>
                    </div>
                  ))}
                  
                  {/* Interactive element */}
                  <div className="mt-8 p-4 bg-purple-900 bg-opacity-30 border border-purple-500 border-opacity-30 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-300 mb-2">Did you know?</h3>
                    <p className="text-indigo-100">
                      75% of resumes are rejected by ATS systems before they ever reach a human recruiter.
                    </p>
                  </div>
                  
                  {/* Visual stats */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-blue-300 mb-3">Success Factors</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-indigo-200 mb-1">
                          <span>Keyword Matching</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-blue-900 bg-opacity-30 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-indigo-200 mb-1">
                          <span>Format Compatibility</span>
                          <span>90%</span>
                        </div>
                        <div className="w-full bg-blue-900 bg-opacity-30 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-indigo-200 mb-1">
                          <span>Skills Relevance</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-blue-900 bg-opacity-30 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main form area */}
            <div className="lg:col-span-2">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-8 relative overflow-hidden">
                {!result ? (
                  <>
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">
                      {step === 1 ? "Job Description Analysis" : "Resume Submission"}
                    </h2>
                    
                    {error && (
                      <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-100 rounded-lg text-center">
                        {error}
                      </div>
                    )}
                    
                    {step === 1 ? (
                      <form onSubmit={nextStep} className="space-y-6">
                        <div className="group">
                          <label htmlFor="jobDescription" className="block text-lg font-medium text-indigo-100 mb-3 ml-1">
                            <i className="fas fa-briefcase mr-2 text-pink-400"></i>
                            Paste Job Description
                          </label>
                          <div className="relative">
                            <textarea
                              id="jobDescription"
                              name="jobDescription"
                              required
                              value={jobDescription}
                              onChange={(e) => setJobDescription(e.target.value)}
                              className="w-full px-5 py-4 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200 h-64 text-lg"
                              placeholder="Copy and paste the full job description here. Our AI will analyze it to identify required skills, keywords, and qualifications..."
                              disabled={loading}
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={loading}
                          className={`w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 ${
                            loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:-translate-y-1 hover:scale-105'
                          }`}
                        >
                          <i className="fas fa-arrow-right mr-2"></i>
                          Next: Upload Resume
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                          <label htmlFor="resume" className="block text-lg font-medium text-indigo-100 mb-3 ml-1">
                            <i className="fas fa-file-pdf mr-2 text-pink-400"></i>
                            Upload Your Resume (PDF)
                          </label>
                          <div 
                            className={`border-2 border-dashed relative ${dragActive ? 'border-pink-500 bg-pink-500 bg-opacity-10' : 'border-indigo-300 border-opacity-30'} rounded-xl p-10 text-center cursor-pointer bg-white bg-opacity-10 transition duration-200 hover:bg-opacity-15`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('resumeInput').click()}
                          >
                            <input 
                              type="file" 
                              id="resumeInput" 
                              className="hidden" 
                              accept=".pdf" 
                              onChange={onFileInputChange} 
                            />
                            <i className={`fas fa-file-upload text-6xl ${dragActive ? 'text-pink-400' : 'text-indigo-300'} mb-4 transition-all duration-300 transform ${dragActive ? 'scale-110' : ''}`}></i>
                            <p className="text-white text-xl mb-2 font-medium">
                              {fileName}
                            </p>
                            <p className="text-indigo-200 text-lg">
                              Drag and drop your resume PDF or click to browse
                            </p>
                            <div className="mt-4 text-sm text-indigo-300">
                              Our AI will extract and analyze your skills and experience
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-10 transition duration-200 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="w-1/3 py-4 px-6 rounded-xl text-white font-bold text-lg border border-white border-opacity-30 transform transition-all duration-300 hover:bg-white hover:bg-opacity-10 group"
                          >
                            <i className="fas fa-arrow-left mr-2 group-hover:animate-pulse"></i>
                            Back
                          </button>
                          
                          <button
                            type="submit"
                            disabled={loading}
                            className={`w-2/3 bg-gradient-to-r from-purple-600 to-pink-600 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 ${
                              loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:-translate-y-1 hover:scale-105'
                            }`}
                          >
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing with AI...
                              </div>
                            ) : (
                              <>
                                <i className="fas fa-robot mr-2"></i>
                                Analyze Resume with AI
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  // Results section - This was missing in the original code
                  <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 mb-6 text-center">
                    AI Analysis Results
                  </h2>
                
                  {/* Error Handling Section */}
                  {result.MissingKeywords[0] === "Could not parse response" && (
                    <div className="p-6 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-xl text-center">
                      <i className="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
                      <p className="text-white text-xl font-medium">{result.ProfileSummary}</p>
                      <p className="text-red-200 mt-2">Error: {result.MissingKeywords[0]}</p>
                    </div>
                  )}
                
                  {/* Success Section (if no error) */}
                  {!result.MissingKeywords.includes("Could not parse response") && (
                    <>
                      {/* JD Match Section */}
                      <div className="p-6 bg-white bg-opacity-10 rounded-xl border border-indigo-300 border-opacity-20">
                        <h3 className="text-2xl font-medium text-indigo-100 mb-4">Job Description Match</h3>
                        <div className="text-indigo-200 text-lg">
                          <strong>Match Percentage:</strong> {result['JD Match'] || "N/A"}
                        </div>
                      </div>
                
                      {/* Missing Keywords Section */}
                      <div className="p-6 bg-white bg-opacity-10 rounded-xl border border-indigo-300 border-opacity-20">
                        <h3 className="text-2xl font-medium text-indigo-100 mb-4">Missing Keywords</h3>
                        <ul className="list-disc pl-6 text-indigo-200">
                          {result.MissingKeywords.map((keyword, index) => (
                            <li key={index} className="mb-2">
                              {keyword}
                            </li>
                          ))}
                        </ul>
                      </div>
                
                      {/* Profile Summary */}
                      <div className="p-6 bg-white bg-opacity-10 rounded-xl border border-indigo-300 border-opacity-20">
                        <h3 className="text-2xl font-medium text-indigo-100 mb-4">Profile Summary</h3>
                        <p className="text-indigo-200 text-lg">{result['Profile Summary']}</p>
                      </div>
                    </>
                  )}
                
                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={() => {
                        setResult(null);
                        setStep(1);
                      }}
                      className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-1"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
  
                )}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-10 text-center text-indigo-200 opacity-80">
            <p>© 2025 Resume AI Optimizer • Powered by Advanced AI Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
}



