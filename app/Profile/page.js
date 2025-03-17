'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Helper Components
const InfoField = ({ label, value }) => (
  <div className="neon-info-field">
    <span className="text-purple-400 font-mono text-sm">{label}</span>
    <p className="text-cyan-300 font-mono text-lg truncate">
      {value || '⸺⸺⸺⸺⸺'}
    </p>
  </div>
);

const CyberButton = ({ children, variant = 'primary', loading, ...props }) => (
  <button
    {...props}
    className={`px-6 py-3 font-mono font-bold rounded-lg transition-all duration-300 ${
      variant === 'primary' 
        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-cyber'
        : variant === 'secondary' 
        ? 'bg-gray-800 text-cyan-400 hover:bg-gray-700/50 hover:text-purple-400 border border-cyan-500/40'
        : 'bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 text-white'
    } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
  >
    {children}
  </button>
);

const CyberInput = ({ label, ...props }) => (
  <div className="neon-input-group">
    <label className="block text-cyan-400 text-sm font-mono mb-2">{label}</label>
    <input
      {...props}
      className="w-full bg-gray-900/60 backdrop-blur-sm px-4 py-3 border-l-4 border-purple-400/60 
               text-cyan-200 font-mono placeholder-gray-500 focus:outline-none focus:border-cyan-400
               focus:bg-gray-900/90 transition-all"
    />
  </div>
);

// Main Component
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', username: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    apiBaseUrl: '',
    endpointsTried: [],
    authMethod: 'cookies',
    corsConfigured: false,
    lastRequest: null
  });

  // Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const API_PATHS = ['/api/user/me'];
  const AUTH_METHOD = 'token';

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const endpointsAttempted = [];
      
      try {
        let response;
        let successfulPath;

        for (const path of API_PATHS) {
          try {
            endpointsAttempted.push(`${API_BASE_URL}${path}`);
            const headers = {
              'Content-Type': 'application/json',
              ...(AUTH_METHOD === 'token' && { 
                Authorization: `Bearer ${localStorage.getItem('token')}`
              })
            };
            

            response = await fetch(`${API_BASE_URL}${path}`, {
              method: 'GET',
              headers,
              credentials: AUTH_METHOD === 'cookie' ? 'include' : 'omit'
            });

            setDebugInfo(prev => ({
              ...prev,
              apiBaseUrl: API_BASE_URL,
              endpointsTried: endpointsAttempted,
              authMethod: AUTH_METHOD,
              lastRequest: {
                url: `${API_BASE_URL}${path}`,
                status: response.status,
                headers: Object.fromEntries(response.headers.entries()),
                cookies: document.cookie
              }
            }));

            if (response.ok) {
              successfulPath = path;
              break;
            }
          } catch (error) {
            console.error(`Error trying ${path}:`, error);
          }
        }

        if (!response || !response.ok) {
          throw new Error(`No valid endpoint found. Tried: ${endpointsAttempted.join(', ')}`);
        }

        const responseData = await response.json();
        setUser(responseData);
        setFormData({
          firstName: responseData.first_name || '',
          lastName: responseData.last_name || '',
          username: responseData.username || '',
        });
        
        setDebugInfo(prev => ({
          ...prev,
          successfulEndpoint: successfulPath,
          authStatus: AUTH_METHOD === 'token' 
            ? !!localStorage.getItem('token')
            : document.cookie.includes('session')
        }));

      } catch (err) {
        setError({
          message: err.message,
          details: {
            apiBaseUrl: API_BASE_URL,
            authToken: AUTH_METHOD === 'token' ? localStorage.getItem('token') : 'Using cookies',
            cookies: document.cookie,
            corsHeaders: debugInfo.lastRequest?.headers?.['access-control-allow-origin'] || 'Not detected'
          }
        });
        if (err.message.includes('401')) router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const path = debugInfo.successfulEndpoint || API_PATHS[0];
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(AUTH_METHOD === 'token' && { 
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
        },
        credentials: AUTH_METHOD === 'cookie' ? 'include' : 'omit',
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Update failed: ${response.status}`);

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    
    try {
      const basePath = debugInfo.successfulEndpoint || API_PATHS[0];
      const path = `${basePath}/password`;
      
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(AUTH_METHOD === 'token' && { 
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
        },
        credentials: AUTH_METHOD === 'cookie' ? 'include' : 'omit',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Password change failed: ${response.status}`);
      }

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setSuccessMessage('Password changed successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const path = debugInfo.successfulEndpoint || API_PATHS[0];
        const response = await fetch(`${API_BASE_URL}${path}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(AUTH_METHOD === 'token' && { 
              Authorization: `Bearer ${localStorage.getItem('token')}`
            })
          },
          credentials: AUTH_METHOD === 'cookie' ? 'include' : 'omit',
        });

        if (!response.ok) throw new Error(`Deletion failed: ${response.status}`);
        router.push('/Login');
      } catch (err) {
        setError({ message: err.message });
      }
    }
  };

  const renderDebugPanel = () => (
    <div className="neon-debug-panel bg-gray-900/80 p-4 rounded-xl border-2 border-purple-500/40 mt-6">
      <h3 className="text-cyan-400 font-mono text-lg mb-3">DEBUG CONSOLE</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-purple-200">
        <div>
          <p><strong>API Base:</strong> {debugInfo.apiBaseUrl}</p>
          <p><strong>Auth Method:</strong> {AUTH_METHOD}</p>
          <p><strong>Auth Status:</strong> {debugInfo.authStatus ? '✅' : '❌'}</p>
        </div>
        <div>
          <p><strong>CORS Origin:</strong> {debugInfo.lastRequest?.headers?.['access-control-allow-origin'] || 'Unknown'}</p>
          <p><strong>Last Status:</strong> {debugInfo.lastRequest?.status}</p>
          <p><strong>Cookies:</strong> {document.cookie || 'None'}</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-cyan-400 font-mono mb-2">ENDPOINTS TRIED:</h4>
        <ul className="list-disc pl-5 text-purple-300">
          {debugInfo.endpointsTried.map((endpoint, index) => (
            <li key={index} className="font-mono text-sm">{endpoint}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex gap-2">
        <CyberButton variant="secondary" onClick={() => window.location.reload()}>
          🔄 REFRESH
        </CyberButton>
        <CyberButton variant="secondary" onClick={() => fetch(`${API_BASE_URL}${debugInfo.successfulEndpoint || API_PATHS[0]}`)
          .then(res => alert(`Endpoint test: ${res.status}`))}>
          🧪 TEST ENDPOINT
        </CyberButton>
      </div>
    </div>
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push('/Login');
    }
  }, [loading, user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Your profile
        </h1>

        {error && (
          <div className="neon-error mb-6 p-4 rounded-xl border-2 border-red-500/40 bg-red-900/20 backdrop-blur-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-red-400 font-mono">⚠️ SYSTEM ERROR: {error.message}</p>
                <pre className="text-red-300/80 text-sm mt-2 font-mono">
                  {JSON.stringify(error.details, null, 2)}
                </pre>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 text-2xl"
              >
                ⨯
              </button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="neon-success mb-6 p-4 rounded-xl border-2 border-green-500/40 bg-green-900/20 backdrop-blur-lg">
            <p className="text-green-400 font-mono">✔️ {successMessage}</p>
          </div>
        )}

        <div className="cyber-panel mb-8">
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border-2 border-purple-500/40 shadow-cyber-lg">
            {!editMode ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField label="USERNAME" value={user?.username} />
                  <InfoField label="EMAIL" value={user?.email} />
                  <InfoField label="FIRST_NAME" value={user?.first_name} />
                  <InfoField label="LAST_NAME" value={user?.last_name} />
                </div>
                
                <div className="flex gap-4">
                  <CyberButton onClick={() => setEditMode(true)}>
                    ↯ UPDATE PROFILE
                  </CyberButton>
                  <CyberButton onClick={() => setShowPasswordForm(!showPasswordForm)} variant="secondary">
                    ⚙ CHANGE Password
                  </CyberButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <CyberInput
                  label="CYBER HANDLE"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="ENTER CYBER HANDLE"
                />
                <CyberInput
                  label="PRIMARY ID"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="ENTER PRIMARY IDENT"
                />
                <CyberInput
                  label="SECONDARY ID"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="ENTER SECONDARY IDENT"
                />
                <div className="flex gap-4">
                  <CyberButton type="submit" loading={loading}>
                    {loading ? '⌛ ENCRYPTING...' : '💾 SAVE MATRIX'}
                  </CyberButton>
                  <CyberButton variant="secondary" onClick={() => setEditMode(false)}>
                    ⎋ CANCEL
                  </CyberButton>
                </div>
              </form>
            )}
          </div>
        </div>

        {showPasswordForm && (
          <div className="cyber-panel mb-8">
            <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border-2 border-cyan-500/40 shadow-cyber-lg">
              <h2 className="text-2xl font-mono text-cyan-400 mb-6">Update Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                <CyberInput
                  type="password"
                  label="CURRENT CIPHER"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="ENTER CURRENT CIPHER"
                />
                <CyberInput
                  type="password"
                  label="NEW CIPHER"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="GENERATE NEW CIPHER"
                />
                <CyberInput
                  type="password"
                  label="CONFIRM CIPHER"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="RE-ENTER NEW CIPHER"
                />
                <div className="flex gap-4">
                  <CyberButton type="submit" loading={loading}>
                    {loading ? '⌛ RECODING...' : '⚡ UPDATE CIPHER'}
                  </CyberButton>
                  <CyberButton variant="secondary" onClick={() => setShowPasswordForm(false)}>
                    ⎋ CANCEL
                  </CyberButton>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="cyber-panel">
          <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border-2 border-red-500/40 shadow-cyber-lg">
            <h2 className="text-2xl font-mono text-red-400 mb-6">⚠ DANGER ZONE</h2>
            <CyberButton 
              onClick={handleDeleteAccount} 
              variant="danger"
              className="animate-pulse"
            >
              ☠ DELETE YOUR ACCOUNT
            </CyberButton>
          </div>
        </div>

        {renderDebugPanel()}

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="neon-link text-cyan-400 hover:text-purple-400 font-mono">
            ← RETURN TO CONTROL PANEL
          </Link>
        </div>
      </div>
    </div>
  );
}