"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    setError('');
    setIsOTPRequested(false);
  };

  const handleOTPSend = async () => {
    if (!formData.email) {
      setError('Please enter your email first');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3002/api/auth/otp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsOTPRequested(true);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const API_BASE_URL = 'http://localhost:3002/api/auth';
      let response;

      if (loginMethod === 'password') {
        response = await fetch(`${API_BASE_URL}/login/password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: 'include',
        });
      } else {
        response = await fetch(`${API_BASE_URL}/otp/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            code: formData.otp,
          }),
          credentials: 'include',
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Redirect to create template page
      router.push('/Create-template');
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-3xl font-bold text-white hover:text-blue-100 transition"
          >
            Resume Builder
          </button>
          <p className="mt-2 text-blue-100">Welcome back! Please sign in to continue</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log In</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-6 space-x-4">
            <button
              type="button"
              onClick={() => handleMethodChange('password')}
              className={`px-4 py-2 rounded-lg ${
                loginMethod === 'password' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => handleMethodChange('otp')}
              className={`px-4 py-2 rounded-lg ${
                loginMethod === 'otp' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              OTP Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {loginMethod === 'password' ? (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>
            ) : (
              <>
                {isOTPRequested ? (
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                      OTP Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={isLoading}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Check your email for the OTP code
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleOTPSend}
                      disabled={isLoading || !formData.email}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-70 transition"
                    >
                      {isLoading ? 'Sending...' : 'Send OTP Code'}
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button 
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              } transition`}
              disabled={isLoading || (loginMethod === 'otp' && !isOTPRequested)}
            >
              {isLoading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;