// "use client"; // Mark this component as a Client Component

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const LoginPage = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false,
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
  
//    // Replace your fetch code with this
// try {
//   // Store your API base URL in a variable for easy modification
//   const API_BASE_URL = 'http://localhost:3000'; // Change this to match your backend URL
  
//   console.log('Attempting to connect to:', `${API_BASE_URL}/api/auth/login`);
  
//   const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: formData.email,
//       password: formData.password,
//       rememberMe: formData.rememberMe 
//     }),
//     credentials: 'include',
//   });
  
//   // Rest of your code...
  
//       // First check if response exists
//       if (!response) {
//         throw new Error('No response from server');
//       }
  
//       // Handle non-JSON responses more gracefully
//       let data;
//       try {
//         data = await response.json();
//       } catch (jsonError) {
//         console.error('Failed to parse JSON:', jsonError);
//         throw new Error('Invalid response format from server');
//       }
  
//       // Check for error responses
//       if (!response.ok) {
//         throw new Error(data?.error || data?.message || 'Login failed');
//       }
  
//       // If login successful
//       if (data.token) {
//         // Store token securely
//         localStorage.setItem('token', data.token);
        
//         // You might also want to store user info if returned
//         if (data.user) {
//           localStorage.setItem('user', JSON.stringify(data.user));
//         }
        
//         // Redirect to dashboard
//         router.push('/Create-template');
//       } else {
//         throw new Error('No token received from server');
//       }
//     } catch (error) {
//       console.error('Login Error:', error.message || error);
//       setError(error.message || 'Failed to login. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <button
//             onClick={() => router.push('/')}
//             className="text-3xl font-bold text-white hover:text-blue-100 transition"
//           >
//             Resume Builder
//           </button>
//           <p className="mt-2 text-blue-100">Welcome back! Please sign in to continue</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-xl p-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log In</h2>
          
//           {/* Display error message if any */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   disabled={isLoading}
//                 />
//                 <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>
//               <button 
//                 type="button"
//                 className="text-sm text-blue-600 hover:text-blue-500"
//                 disabled={isLoading}
//               >
//                 Forgot password?
//               </button>
//             </div>
//             <button
//               type="submit"
//               className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold ${
//                 isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
//               } transition`}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Logging in...' : 'Log In'}
//             </button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-4">
//               <button 
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center justify-center"
//                 disabled={isLoading}
//               >
//                 <span className="mr-2">G</span> Google
//               </button>
//               <button 
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center justify-center"
//                 disabled={isLoading}
//               >
//                 <span className="mr-2">f</span> Facebook
//               </button>
//             </div>
//           </div>

//           <p className="mt-8 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <button
//               onClick={() => router.push('/signup')}
//               className="text-blue-600 hover:text-blue-500 font-semibold"
//               disabled={isLoading}
//             >
//               Sign up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
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

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, userId, user } = response.data;

      if (!token || !userId) {
        throw new Error('Invalid authentication response');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      router.push('/show');

    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Login failed. Please try again.';
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-500 rounded-full opacity-20"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500 rounded-full opacity-10"></div>
          
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Sign In</h2>
          
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
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-200"></div>
              </div>
            </div>
            
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

            <div className="flex items-center justify-between">
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

              <div className="text-sm">
                <a href="#" className="font-medium text-pink-300 hover:text-pink-200 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
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
                  Signing in...
                </div>
              ) : (
                'Sign In'
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

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button 
                type="button"
                className="group relative px-4 py-3 border border-white border-opacity-20 rounded-xl text-white hover:bg-white hover:bg-opacity-5 transition flex items-center justify-center overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10">Google</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button 
                type="button"
                className="group relative px-4 py-3 border border-white border-opacity-20 rounded-xl text-white hover:bg-white hover:bg-opacity-5 transition flex items-center justify-center overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button 
                type="button"
                className="group relative px-4 py-3 border border-white border-opacity-20 rounded-xl text-white hover:bg-white hover:bg-opacity-5 transition flex items-center justify-center overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10">Facebook</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
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