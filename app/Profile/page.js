'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Edit, Key, LogOut, RefreshCw, Save, X, Trash2, ChevronLeft } from 'lucide-react';
import Footer from '../components/Footer';

// Improved Component Architecture
const Panel = ({ children, variant = 'primary', className = '' }) => {
  const borderColor = {
    primary: 'border-purple-500/40',
    secondary: 'border-cyan-500/40',
    danger: 'border-red-500/40',
  }[variant];

  return (
    <div className={`relative bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border-2 ${borderColor} shadow-lg mb-6 ${className}`}>
      {children}
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div className="mb-4">
    <span className="text-purple-400 font-mono text-xs uppercase tracking-wider block mb-1">{label}</span>
    <p className="text-cyan-300 text-lg font-mono truncate bg-gray-800/40 p-3 rounded-lg border-l-4 border-purple-500/60">
      {value || '—'}
    </p>
  </div>
);

const CyberButton = ({ children, variant = 'primary', loading, icon, onClick, type = 'button', className = '' }) => {
  const baseStyle = "px-5 py-3 font-mono font-bold rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-md",
    secondary: "bg-gray-800 text-cyan-400 hover:bg-gray-700 hover:text-purple-400 border border-cyan-500/40",
    danger: "bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseStyle} ${variantStyles[variant]} ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${className}`}
    >
      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
};

const CyberInput = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-cyan-400 text-sm font-mono mb-2">{label}</label>
    <input
      {...props}
      className={`w-full bg-gray-900/60 backdrop-blur-sm px-4 py-3 border-l-4 
               text-cyan-200 font-mono placeholder-gray-500 focus:outline-none
               focus:bg-gray-900/90 transition-all rounded-lg
               ${error ? 'border-red-500/60 focus:border-red-500' : 'border-purple-400/60 focus:border-cyan-400'}`}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

const Alert = ({ type, message, onClose }) => {
  const alertStyles = {
    error: "border-red-500/40 bg-red-900/20 text-red-400",
    success: "border-green-500/40 bg-green-900/20 text-green-400",
  };

  return message ? (
    <div className={`mb-6 p-4 rounded-xl border-2 backdrop-blur-lg flex items-start justify-between ${alertStyles[type]}`}>
      <div className="flex items-center gap-3">
        {type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
        <p className="font-mono">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-2xl hover:opacity-70 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  ) : null;
};

// Main Component
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [section, setSection] = useState('profile'); // 'profile', 'password', 'danger'
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({});

  // Configuration
  const API_BASE_URL = 'http://ec2-13-203-197-138.ap-south-1.compute.amazonaws.com';
  const API_PATHS = ['/api/user/me'];
  const AUTH_METHOD = 'token';

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/Login');
          return;
        }

        let userData = null;
        let errorMessage = null;

        for (const path of API_PATHS) {
          try {
            const response = await fetch(`${API_BASE_URL}${path}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            if (response.ok) {
              userData = await response.json();
              break;
            } else {
              errorMessage = `Error ${response.status}: ${response.statusText}`;
              if (response.status === 401) {
                router.push('/login');
                return;
              }
            }
          } catch (err) {
            errorMessage = `Network error: ${err.message}`;
          }
        }

        if (userData) {
          setUser(userData);
          setFormData({
            firstName: userData.first_name || '',
            lastName: userData.last_name || '',
            username: userData.username || '',
            email: userData.email || '',
          });
        } else {
          throw new Error(errorMessage || 'Failed to fetch user data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (formData.username && formData.username.length < 3) errors.username = 'Username must be at least 3 characters';
    return errors;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) errors.newPassword = 'New password is required';
    if (passwordData.newPassword && passwordData.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
    if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const errors = validateProfileForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}${API_PATHS[0]}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Update failed: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}${API_PATHS[0]}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Password change failed: ${response.status}`);
      }

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSection('profile');
      setSuccess('Password changed successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setSubmitting(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}${API_PATHS[0]}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || `Deletion failed: ${response.status}`);
        }

        localStorage.removeItem('token');
        router.push('/login');
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="bg-gray-900/80 p-8 rounded-2xl border-2 border-purple-500/40 shadow-lg">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
            <p className="text-cyan-300 font-mono">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return null; // Redirect handled in useEffect
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <div className="flex gap-3">
            <Link href="/show">
              <CyberButton variant="secondary" icon={<ChevronLeft className="w-4 h-4" />}>
                Dashboard
              </CyberButton>
            </Link>
            <CyberButton 
              variant="secondary" 
              icon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Logout
            </CyberButton>
          </div>
        </div>

        <Alert 
          type="error" 
          message={error} 
          onClose={() => setError(null)} 
        />
        
        <Alert 
          type="success" 
          message={success} 
          onClose={() => setSuccess(null)} 
        />

        <div className="flex gap-4 mb-6">
          <CyberButton
            variant={section === 'profile' ? 'primary' : 'secondary'}
            onClick={() => setSection('profile')}
            className="flex-1"
          >
            Profile
          </CyberButton>
          <CyberButton
            variant={section === 'password' ? 'primary' : 'secondary'}
            onClick={() => setSection('password')}
            className="flex-1"
          >
            Password
          </CyberButton>
          <CyberButton
            variant={section === 'danger' ? 'danger' : 'secondary'}
            onClick={() => setSection('danger')}
            className="flex-1"
          >
            Account
          </CyberButton>
        </div>

        {section === 'profile' && (
          <Panel>
            {!editMode ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField label="Username" value={user?.username} />
                  <InfoField label="Email" value={user?.email} />
                  <InfoField label="First Name" value={user?.first_name} />
                  <InfoField label="Last Name" value={user?.last_name} />
                </div>
                
                <div className="flex justify-end mt-6">
                  <CyberButton 
                    onClick={() => setEditMode(true)} 
                    icon={<Edit className="w-4 h-4" />}
                  >
                    Edit Profile
                  </CyberButton>
                </div>
              </>
            ) : (
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CyberInput
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    error={formErrors.username}
                  />
                  <CyberInput
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    disabled
                  />
                  <CyberInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    error={formErrors.firstName}
                  />
                  <CyberInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    error={formErrors.lastName}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <CyberButton 
                    variant="secondary" 
                    onClick={() => setEditMode(false)}
                    icon={<X className="w-4 h-4" />}
                  >
                    Cancel
                  </CyberButton>
                  <CyberButton 
                    type="submit" 
                    loading={submitting}
                    icon={<Save className="w-4 h-4" />}
                  >
                    Save Changes
                  </CyberButton>
                </div>
              </form>
            )}
          </Panel>
        )}

        {section === 'password' && (
          <Panel variant="secondary">
            <h2 className="text-xl font-mono text-cyan-400 mb-6">Change Password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <CyberInput
                type="password"
                label="Current Password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                error={formErrors.currentPassword}
              />
              <CyberInput
                type="password"
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                error={formErrors.newPassword}
              />
              <CyberInput
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                error={formErrors.confirmPassword}
              />
              <div className="flex justify-end gap-4 mt-6">
                <CyberButton 
                  variant="secondary" 
                  onClick={() => setSection('profile')}
                  icon={<X className="w-4 h-4" />}
                >
                  Cancel
                </CyberButton>
                <CyberButton 
                  type="submit" 
                  loading={submitting}
                  icon={<Key className="w-4 h-4" />}
                >
                  Update Password
                </CyberButton>
              </div>
            </form>
          </Panel>
        )}

        {section === 'danger' && (
          <Panel variant="danger">
            <h2 className="text-xl font-mono text-red-400 mb-4">Danger Zone</h2>
            <p className="text-gray-300 mb-6">
              Deleting your account will permanently erase all your data. This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <CyberButton 
                onClick={handleDeleteAccount} 
                variant="danger"
                loading={submitting}
                icon={<Trash2 className="w-4 h-4" />}
              >
                Delete Account
              </CyberButton>
            </div>
          </Panel>
        )}
      </div>
      <Footer></Footer>
    </div>
    </>
  );
}