// src/pages/Profile.tsx - Version i thjeshtuar për testim
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form data me të gjitha fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    location: '',
    bio: '',
    linkedin: '',
    github: '',
    website: '',
    avatar: '',
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        profession: user.profession || '',
        location: user.location || '',
        bio: user.bio || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        website: user.website || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const success = await updateProfile(formData);
      if (success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="not-logged-in">
          <h2>Please log in to view your profile</h2>
          <p>You need to be logged in to access your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your personal information and settings</p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`message-alert ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        {/* Sidebar - Profile Info */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.displayName} />
                ) : (
                  <div className="avatar-initials">
                    {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="avatar-info">
                <h3>{user.name || user.displayName}</h3>
                <p className="profession">{user.profession || 'No profession set'}</p>
                <p className="location">📍 {user.location || 'Location not set'}</p>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Applications</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Interviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Offers</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="edit-profile-btn"
            >
              {isEditing ? '👁️ View Profile' : '✏️ Edit Profile'}
            </button>
          </div>

          {/* Social Links */}
          <div className="social-links-card">
            <h4>Contact & Links</h4>
            <div className="social-links">
              <div className="contact-info">
                <p>📧 {user.email}</p>
                {user.phone && <p>📱 {user.phone}</p>}
              </div>
              <div className="social-icons">
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                    💼 Linkedin
                  </a>
                )}
                {user.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="social-link">
                    💻 GitHub
                  </a>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="social-link">
                    🌐 Yourwebsite
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Form or View */}
        <div className="profile-main">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      disabled
                    />
                    <small>Email cannot be changed</small>
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Profession</label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      placeholder="Software Developer"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Avatar URL</label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Professional Information</h3>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your experience, skills, and career goals..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Social Links</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>GitHub</label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              <div className="info-section">
                <h3>About Me</h3>
                <div className="bio-content">
                  {user.bio ? (
                    <p>{user.bio}</p>
                  ) : (
                    <p className="no-bio">No bio added yet. Click "Edit Profile" to add one.</p>
                  )}
                </div>
              </div>

              <div className="info-section">
                <h3>Professional Details</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Profession:</span>
                    <span className="info-value">{user.profession || 'Not specified'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{user.location || 'Not specified'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Experience:</span>
                    <span className="info-value">5+ years</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-active">Active Job Seeker</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Contact Information</h3>
                <div className="contact-details">
                  <p><strong>Email:</strong> {user.email}</p>
                  {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                  <div className="social-links-view">
                    {user.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    )}
                    <br />
                    <br />
                    {user.github && (
                      <a href={user.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {user.website && (
                      <a href={user.website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;