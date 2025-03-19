// pages/resume-generator.js
"use client"
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function ResumeGenerator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeSections, setResumeSections] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    education: '',
    skills: '',
    projects: '',
    certifications: '',
    additional: ''
  });
  const [editedContent, setEditedContent] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle edited content changes
  const handleEditedContentChange = (e) => {
    const { name, value } = e.target;
    setEditedContent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit form data to generate resume
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate resume');
      }

      const data = await response.json();
      setResumeSections(data);
      setEditedContent(data); // Initialize edited content with generated content
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Download the edited resume as PDF
  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Combine form data and edited content for the download
      const downloadData = {
        ...formData,
        editedContent: editedContent
      };

      const response = await fetch('http://localhost:5000/api/download-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(downloadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download resume');
      }

      // Create a blob from the PDF stream
      const blob = await response.blob();
      
      // Create a link element to trigger download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${formData.name.replace(/\s+/g, '_')}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up the URL object
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the form and generated content
  const handleReset = () => {
    setFormData({
      name: '',
      role: '',
      education: '',
      skills: '',
      projects: '',
      certifications: '',
      additional: ''
    });
    setResumeSections(null);
    setEditedContent({});
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>AI Resume Generator</title>
        <meta name="description" content="Generate professional resumes with AI" />
      </Head>

      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">AI Resume Generator</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!resumeSections ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">
                    Target Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="education" className="block mb-2 text-sm font-medium text-gray-700">
                  Education
                </label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List your education history, degrees, universities, etc."
                  required
                ></textarea>
              </div>

              <div className="mt-4">
                <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-700">
                  Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List your technical and professional skills"
                  required
                ></textarea>
              </div>

              <div className="mt-4">
                <label htmlFor="projects" className="block mb-2 text-sm font-medium text-gray-700">
                  Projects
                </label>
                <textarea
                  id="projects"
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your projects, roles, and achievements"
                  required
                ></textarea>
              </div>

              <div className="mt-4">
                <label htmlFor="certifications" className="block mb-2 text-sm font-medium text-gray-700">
                  Certifications
                </label>
                <textarea
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List any relevant certifications or credentials"
                  required
                ></textarea>
              </div>

              <div className="mt-4">
                <label htmlFor="additional" className="block mb-2 text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  id="additional"
                  name="additional"
                  value={formData.additional}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any other relevant information (languages, interests, etc.)"
                  required
                ></textarea>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate Resume'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Your Resume</h2>
              <div className="flex space-x-3">
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {isLoading ? 'Processing...' : 'Download PDF'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Create New Resume
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Professional Summary</h3>
                <textarea
                  name="professionalSummary"
                  value={editedContent.professionalSummary || ''}
                  onChange={handleEditedContentChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Education</h3>
                <textarea
                  name="education"
                  value={editedContent.education || ''}
                  onChange={handleEditedContentChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Skills</h3>
                <textarea
                  name="skills"
                  value={editedContent.skills || ''}
                  onChange={handleEditedContentChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Projects</h3>
                <textarea
                  name="projects"
                  value={editedContent.projects || ''}
                  onChange={handleEditedContentChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Certifications</h3>
                <textarea
                  name="certifications"
                  value={editedContent.certifications || ''}
                  onChange={handleEditedContentChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Additional Information</h3>
                <textarea
                  name="additional"
                  value={editedContent.additional || ''}
                  onChange={handleEditedContentChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}