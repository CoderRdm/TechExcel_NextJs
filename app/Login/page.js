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

import { useState } from 'react';
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

      router.push('/Create-template');

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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Google
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  GitHub
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;