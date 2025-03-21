"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Footer from "./components/Footer";
export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      title: "🚀 INSANE TEMPLATES",
      description: "ATS-friendly designs that make recruiters LOSE THEIR MINDS 🤯",
      emoji: "💼",
      color: "from-pink-600 to-purple-600"
    },
    {
      title: "🎯 HYPER-TARGETED",
      description: "ULTRA-specialized for tech, healthcare, finance & MORE 🔥",
      emoji: "🔧",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "✨ WILD CUSTOMIZATION",
      description: "Edit like a WIZARD with live previews & MAGIC WAND 🪄",
      emoji: "🎨",
      color: "from-green-500 to-yellow-500"
    },
  ];

  const testimonials = [
    {
      name: "Yug Agarwal",
      role: "Senior SWE @Google",
      content: "This builder got me 3x more interviews! 🤯 BEST. DECISION. EVER!!!!",
      image: "/team/yug.jpeg",
      rotation: "-rotate-3"
    },
    {
      name: "Tanishk Sharma",
      role: "Growth Marketer",
      content: "My resume went from ZERO to HERO in 10 minutes! 🔥🔥🔥",
      image: "/team/tanishk.jpeg",
      rotation: "rotate-3"
    },
  ];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <>
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <Head>
        <Image 
                  src="/Wizard.jpg" 
                  alt="Company team working together" 
                  fill 
                  className="object-cover" 
                  priority
                />
        <title>ResumeWizard - MIND-BLOWING Resume Builder</title>
        <meta name="description" content="AI-powered resume builder with EXTREME magic ✨💥" />
      </Head>

      {/* Dynamic Cursor Effect */}
      <div 
        className="fixed w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-xl pointer-events-none z-50 mix-blend-screen"
        style={{ 
          left: `${mousePosition.x - 48}px`, 
          top: `${mousePosition.y - 48}px`,
          transition: 'transform 0.05s ease-out'
        }}
      ></div>

      {/* Animated Particles Background */}
      <div className="fixed inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 120 },
              size: { value: { min: 1, max: 5 } },
              color: { value: ["#ff00ff", "#00ffff", "#ffff00"] },
              move: { 
                enable: true, 
                speed: 3,
                direction: "none",
                outModes: "out",
                random: true
              },
              opacity: { value: { min: 0.3, max: 0.8 } },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
              }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse"
                }
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4
                }
              }
            }
          }}
        />
      </div>
      
      {/* Glitchy Overlay Effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-purple-900/20 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('/favicon.ico')] opacity-5 z-0 pointer-events-none"></div>

      {/* Psychedelic Navbar */}
      {/* <nav className="backdrop-blur-xl bg-opacity-10 bg-black border-b border-purple-500/50 fixed w-full z-50 animate-pulse">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent hover:animate-pulse relative group">
            ResumeWizard 
            <span className="absolute -top-1 -right-3 text-2xl group-hover:animate-spin transition-all duration-300">✨</span>
            <span className="absolute -bottom-2 -right-1 text-sm animate-bounce">2.0</span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:font-black hover:tracking-widest">
              <span className="mr-2 animate-pulse">✨</span>Features
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-pink-400 transition-all duration-300 hover:scale-110 hover:font-black hover:tracking-widest">
              <span className="mr-2 animate-pulse">🌟</span>Reviews
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/Login" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-black shadow-lg shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none">
              START MAGIC 🪄💥
            </Link>
          </div>
        </div>
      </nav> */}

      {/* HERO SECTION */}
      <header className="relative pt-32 pb-24 md:pt-48 md:pb-32 z-10">
        <div className="container mx-auto px-4 text-center">
          {/* Glitchy Title with Animated Background */}
          <div className="relative mb-8 py-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 via-transparent to-cyan-800/30 rounded-3xl animate-pulse"></div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 leading-tight animate-pulse relative">
              RESUME<span className="animate-spin inline-block ml-2">✨</span>MAGIC
              <div className="absolute -top-5 -right-5 text-5xl animate-bounce">🚀</div>
            </h1>
            
            <span className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-500 to-red-400 bg-clip-text text-transparent inline-block transform -rotate-2 animate-float">
              2X FASTER JOB OFFERS!
              <span className="absolute -bottom-2 -right-2 text-2xl">💰</span>
            </span>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12 transform rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="bg-gradient-to-r from-purple-900/40 via-black/50 to-blue-900/40 backdrop-blur-lg rounded-2xl p-8 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 hover:shadow-pink-500/30 transition-all">
              <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-black mb-6 tracking-widest">
                "USED BY MANY PROFESSIONALS TO EXPLODE CAREER GROWTH 🚀💥"
              </p>
              <div className="flex justify-center">
            <Link href="/GenerateRes" className="px-10 py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 rounded-full text-2xl font-black text-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 flex items-center group relative overflow-hidden animate-pulse hover:animate-none">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
              🧙‍♂️ CREATE YOUR MIND-BENDING AI GENERATED RESUME 
              <span className="ml-2 group-hover:rotate-180 transition-transform duration-500">✨</span>
            </Link>
          </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/Create-template" className="px-10 py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 rounded-full text-2xl font-black text-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 flex items-center group relative overflow-hidden animate-pulse hover:animate-none">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
              🧙‍♂️ CREATE YOUR MIND-BENDING RESUME 
              <span className="ml-2 group-hover:rotate-180 transition-transform duration-500">✨</span>
            </Link>
          </div>
          
          
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section id="features" className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent transform -rotate-1">
            WHY RESUMEWIZARD? 🔮
            <span className="absolute -top-5 -right-5 animate-spin">✨</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${feature.color} bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl border-2 border-cyan-400/30 transition-all duration-500 transform hover:scale-105 hover:-rotate-2 cursor-pointer group relative overflow-hidden`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                
                <div className="text-7xl mb-8 animate-bounce">{feature.emoji}</div>
                <h3 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-pink-400 to-cyan-400 transition-colors tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-semibold">
                  {feature.description}
                </p>
                
                {/* Animated Border Effect on Hover */}
                <div className={`absolute inset-0 border-4 border-transparent rounded-3xl ${hoverIndex === index ? 'animate-border-flow' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent transform rotate-1 relative">
            MIND-BLOWING REVIEWS ✨
            <span className="absolute -top-5 -right-5 text-3xl animate-ping">💫</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-purple-900/30 via-black/40 to-pink-900/30 backdrop-blur-lg p-8 rounded-3xl border-2 border-purple-400/30 hover:border-pink-400/50 transition-all duration-500 transform ${testimonial.rotation} hover:rotate-0 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                
                <div className="flex items-start mb-8">
                  <div className="relative w-20 h-20 rounded-full border-4 border-pink-400 overflow-hidden shadow-lg shadow-pink-500/50 group-hover:shadow-cyan-500/50 transition-all">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  
                  <div className="ml-6">
                    <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">{testimonial.name}</h4>
                    <p className="text-purple-300 font-bold">{testimonial.role}</p>
                  </div>
                  
                </div>
       
                {/* <p className="text-2xl text-white font-bold relative pl-8 before:content-'"' before:text-8xl before:absolute before:-left-2 before:-top-4 before:text-pink-400/30 before:transform before:rotate-12 before:transition-transform group-hover:before:-rotate-12">
                  {testimonial.content}
                </p> */}
                
                {/* Animated corner effects */}
                <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-cyan-400/50 group-hover:border-pink-400/50 transition-colors"></div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-cyan-400/50 group-hover:border-pink-400/50 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-16 z-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/40 via-black/60 to-cyan-900/40 backdrop-blur-lg p-12 rounded-3xl border-2 border-pink-500/30 shadow-2xl shadow-purple-500/30 overflow-hidden relative">
            {/* Animated gradient blobs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 leading-tight">
              READY TO <span className="animate-pulse">TRANSFORM</span> YOUR CAREER?
            </h2>
            <p className="text-2xl text-center text-white mb-10 max-w-3xl mx-auto">
              Join <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">our community</span> job seekers who upgraded their resume game with our <span className="font-black">MAGICAL</span> builder!
            </p>
            <div className="flex justify-center">
              <Link href="/SignUp" className="px-12 py-6 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-full text-2xl font-black text-white hover:scale-110 transition-all duration-300 shadow-xl shadow-pink-500/30 hover:shadow-cyan-500/30 group relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-white/20 to-pink-400/0 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
                GET STARTED FREE 🚀
                <div className="absolute -top-8 -right-8 text-4xl animate-spin">✨</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-r from-purple-900/80 via-black/90 to-cyan-900/80 backdrop-blur-lg border-t-2 border-cyan-400/30 mt-24 z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">🧙‍♂️✨</div>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-6">
              Crafted with EXTREME MAGIC in Silicon Valley | © {new Date().getFullYear()}
            </p>
            <div className="flex justify-center space-x-10">
              <a href="#" className="text-cyan-400 hover:text-pink-400 transition-colors text-lg font-bold hover:scale-110 transform transition-transform">Terms</a>
              <a href="#" className="text-cyan-400 hover:text-pink-400 transition-colors text-lg font-bold hover:scale-110 transform transition-transform">Privacy</a>
              <a href="/Reviews" className="text-cyan-400 hover:text-pink-400 transition-colors text-lg font-bold hover:scale-110 transform transition-transform">Careers</a>
            </div>
          </div>
        </div>
        <Footer></Footer>

      </footer>
    </div>
    
    </>
  );
}