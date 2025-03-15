"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (loginMethod === 'password') {
        // Password login
        const response = await axios.post('http://localhost:3001/api/auth/login/password', {
          email: formData.email,
          password: formData.password
        });
        handleLoginSuccess(response.data);
      } else {
        // OTP login
        if (!otpSent) {
          // Send OTP
          await axios.post('http://localhost:3001/api/auth/otp/generate', {
            email: formData.email
          });
          setOtpSent(true);
        } else {
          console.log(formData.email);
          console.log(otp);
          // Verify OTP
          const response = await axios.post('http://localhost:3001/api/auth/otp/verify', {
            email: formData.email,
            code: otp
          });
          handleLoginSuccess(response.data);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Authentication failed. Please try again.';
      setError(errorMessage);
      if (loginMethod === 'otp' && otpSent) {
        setOtpSent(false);
        setOtp('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (data) => {
    const { token, userId, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);
    console.log(userId);
    console.log(user);
    
    router.push(`/show`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 py-8 px-4 flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`max-w-md w-full transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 hover:from-pink-200 hover:to-indigo-200 transition-all duration-300 transform hover:scale-105"
          >
            Resume Builder
          </button>
          <p className="mt-2 text-blue-100 text-lg font-light">Welcome back to your career journey</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-8 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {loginMethod === 'otp' ? 'OTP Login' : 'Sign In'}
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-100 rounded-lg text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                  placeholder="you@example.com"
                  disabled={isLoading || (loginMethod === 'otp' && otpSent)}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200"></div>
              </div>
            </div>

            {loginMethod === 'password' && (
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-100 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200"></div>
                </div>
              </div>
            )}

{loginMethod === 'otp' && otpSent && (
  <div className="group">
    <label htmlFor="otp" className="block text-sm font-medium text-indigo-100 mb-2 ml-1">
      OTP Code
    </label>
    <div className="relative">
      <input
        id="otp"
        name="otp"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        required
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
        className="w-full px-5 py-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-indigo-200 placeholder-opacity-60 transition duration-200"
        placeholder="Enter 6-digit OTP"
        disabled={isLoading}
        autoFocus  // Added auto-focus for better UX
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200"></div>
    </div>
    <div className="text-right mt-2">
      <button
        type="button"
        onClick={async () => {
          try {
            setIsLoading(true);
            await axios.post('http://localhost:3001/api/auth/generateOTP', {
              email: formData.email
            });
            setOtp('');
          } finally {
            setIsLoading(false);
          }
        }}
        className="text-pink-300 hover:text-pink-200 text-sm"
        disabled={isLoading}
      >
        Resend OTP
      </button>
    </div>
  </div>
)}

            <div className="flex items-center justify-between">
              {loginMethod === 'password' && (
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-indigo-300 rounded bg-opacity-20 bg-white"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-100">
                    Remember me
                  </label>
                </div>
              )}
              {loginMethod === 'password' && (
                <div className="text-sm">
                  <a href="#" className="font-medium text-pink-300 hover:text-pink-200 transition-colors duration-200">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {loginMethod === 'otp' 
                    ? (otpSent ? 'Verifying...' : 'Sending...') 
                    : 'Signing in...'}
                </div>
              ) : (
                loginMethod === 'otp' 
                  ? (otpSent ? 'Verify OTP' : 'Send OTP') 
                  : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setLoginMethod(prev => prev === 'password' ? 'otp' : 'password');
                setOtpSent(false);
                setOtp('');
                setError('');
              }}
              className="text-pink-300 hover:text-pink-200 font-semibold text-sm"
            >
              {loginMethod === 'password' 
                ? 'Login with OTP instead' 
                : 'Login with password instead'}
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white border-opacity-10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white bg-opacity-5 text-indigo-100 rounded-md">Or continue with</span>
              </div>
            </div>

            {/* Social login buttons */}
          </div>

          <p className="mt-10 text-center text-indigo-100">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-pink-300 hover:text-pink-200 font-semibold ml-1 transition-colors duration-200"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;