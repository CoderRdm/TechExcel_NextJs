"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserTemplates from '../components/UserTemplates';

const UserPage = () => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Retrieve token and userId from localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // Validate token and userId
        if (!token || !userId) {
          throw new Error('No authentication found');
        }

        // Debugging logs
        console.log('Fetching Templates:', {
          userId,
          tokenExists: !!token
        });

        // Fetch templates with authorization
        const response = await axios.get(`http://localhost:3000/api/templates/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setTemplates(response.data);

      } catch (error) {
        console.error('Template Fetch Error:', {
          status: error.response?.status,
          message: error.message
        });

        // Handle different error scenarios
        if (error.response?.status === 401) {
          // Token might be expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          router.push('/login');
        } else {
          setError(error.message || 'Failed to fetch templates');
        }
      }
    };

    fetchTemplates();
  }, []);

  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Templates</h1>
      {templates.length === 0 ? (
        <p className="text-gray-600">No templates found</p>
      ) : (
        <div className="w-full max-w-2xl">
          {templates.map(template => (
            <div key={template.id} className="bg-white shadow-md rounded-lg p-4 mb-3 w-full">
              <p className="text-lg font-semibold">Template ID: {template.id}</p>
              {/* Add more template details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
