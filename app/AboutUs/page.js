"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Yug Agarwal",
      role: "Chief Architect",
      bio: "Yug leads our technical strategy with extensive experience in enterprise architecture and cloud solutions.",
      image: "/team/yug.jpg"
    },
    {
      name: "Ridam Goyal",
      role: "Developer",
      bio: "Ridam specializes in full-stack development and oversees our agile development processes.",
      image: "/team/ridam.png"
    },
    {
      name: "Tanishk Sharma",
      role: "Technical Investor",
      bio: "Tanishk bridges the gap between technology and business strategy, ensuring scalable solutions.",
      image: "/team/tanishk.jpg"
    }
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "Pioneering solutions through emerging technologies and creative thinking.",
      icon: "💡"
    },
    {
      title: "Integrity",
      description: "Building trust through transparent operations and ethical practices.",
      icon: "🤝"
    },
    {
      title: "Excellence",
      description: "Delivering superior quality in every project and interaction.",
      icon: "⭐"
    },
    {
      title: "Collaboration",
      description: "Fostering teamwork and partnerships for mutual success.",
      icon: "👥"
    }
  ];

  const stats = [
    { number: "Multiple", label: "Projects Completed" },
    { number: "3+", label: "Team Members" },
    { number: "Multiple", label: "Genre Served" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/favicon.ico"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-indigo-900/80" />
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Shaping the Future of <span className="text-blue-300">Digital Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            Empowering businesses through cutting-edge technology solutions and strategic digital transformation.
          </p>
          <motion.div 
            className="mt-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Company Story */}
      <div className="bg-gradient-to-b from-white to-gray-500">
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          <div className="space-y-8 ">
            <div>
              <span className="text-blue-600 font-semibold">Our Story</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">A Journey of Innovation</h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded in 2025 by visionary technologists, we've evolved from a startup garage to a global innovation hub. 
              Our journey reflects our commitment to solving complex challenges through technology.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="p-8 bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-3xl font-bold text-blue-600">2025</h3>
                <p className="text-gray-600 mt-2">Founded in Jaipur, Rajasthan</p>
              </div>
              
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/favicon.ico"
              alt="Modern workspace"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30" />
          </div>
        </motion.div>
      </section>
    </div>

<div className="bg-lime-500">
      {/* Core Values */}
      <section className="py-32 bg-gradient-to-b from-indigo-900 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <span className="text-white font-semibold">What We Stand For</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Our Core Values</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              The foundation of our success lies in these fundamental principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-6 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>

      {/* Team Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-20"
        >
          <span className="text-blue-600 font-semibold">Meet Our Team</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visionaries driving technological excellence and innovation
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-[400px] relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 p-8 text-white w-full">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-blue-300 font-medium">{member.role}</p>
                <p className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {member.bio}
                </p>
                <div className="mt-6 flex space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <a href="#" className="text-white hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-medium text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
      <Footer></Footer>
      </>
  
);

};

export default AboutUs;