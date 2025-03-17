"use client"
// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="backdrop-blur-xl bg-opacity-90 bg-black border-b border-purple-500/50 fixed w-full z-50 ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent hover:animate-pulse relative group">
          ResumeWizard 
          <span className="absolute -top-1 -right-3 text-2xl group-hover:animate-spin transition-all duration-300">✨</span>
          <span className="absolute -bottom-2 -right-1 text-sm animate-bounce">2.0</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="/Create-template" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:font-black hover:tracking-widest">
            <span className="mr-2 animate-pulse">✨</span>Create
          </a>
          <a href="/Reviews" className="text-gray-300 hover:text-pink-400 transition-all duration-300 hover:scale-110 hover:font-black hover:tracking-widest">
            <span className="mr-2 animate-pulse">🌟</span>Reviews
          </a>
          <a href="/show" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-110 hover:font-black hover:tracking-widest">
            <span className="mr-2 animate-pulse">💰</span>Your templates
          </a>
          <a href="/AboutUs" className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-110 hover:font-black hover:tracking-widest">
            <span className="mr-2 animate-pulse">📝</span>About Us
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center space-x-4">
          <Link href="/Profile" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-black shadow-lg shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none">
            START MAGIC 🪄💥
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white focus:outline-none transition-all duration-300 hover:rotate-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-b border-purple-500/50">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 font-medium">
              <span className="mr-2 animate-pulse">✨</span>Features
            </a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-2 font-medium">
              <span className="mr-2 animate-pulse">🌟</span>Reviews
            </a>
            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 font-medium">
              <span className="mr-2 animate-pulse">💰</span>Pricing
            </a>
            <a href="#blog" className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-all duration-300 hover:translate-x-2 font-medium">
              <span className="mr-2 animate-pulse">📝</span>Blog
            </a>
            <div className="pt-4 px-3">
              <Link href="/Profile" className="block w-full px-4 py-2 text-center rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-black shadow-lg shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none">
                START MAGIC 🪄💥
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;