"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Unified handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Signup successful');
        router.push('/Login');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-800 to-indigo-800 py-8 px-4 flex items-center justify-center overflow-hidden relative">
    {/* Background elements remain same */}

    <div className={`max-w-md w-full transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-8">
        <button
          onClick={() => router.push('/')}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 hover:from-pink-200 hover:to-indigo-200 transition-all duration-300 transform hover:scale-105"
        >
        </button>
        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 hover:from-pink-200 hover:to-indigo-200 transition-all duration-300 transform hover:scale-105">Craft your career story</p>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-8 relative overflow-hidden">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-100 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="Your name"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          </div>
          <label htmlFor="name" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="Your name"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          

          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fname"
                name="first name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="Your name"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="lname"
                name="last name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="Your name"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          </div>


          {/* Email Input */}
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200 pointer-events-none"></div>
            </div>
          </div>

            
            <button
              type="submit"
              className={`w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:-translate-y-1'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Join Resume Builder'
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white border-opacity-10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white bg-opacity-5 text-indigo-100 rounded-md">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="group relative w-full px-4 py-3 border border-white border-opacity-20 rounded-xl text-white hover:bg-white hover:bg-opacity-5 transition flex items-center justify-center overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-lg font-bold">G</span> Google
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button 
                type="button"
                className="group relative w-full px-4 py-3 border border-white border-opacity-20 rounded-xl text-white hover:bg-white hover:bg-opacity-5 transition flex items-center justify-center overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-lg font-bold">f</span> Facebook
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-indigo-100">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/Login')}
              className="text-pink-300 hover:text-pink-200 font-semibold ml-1 transition-colors duration-200"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
          <Footer></Footer>

    </>
  );
};
//wjhrf

export default SignUpPage;