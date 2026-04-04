// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const userInitial = user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1 className="logo-title">JobTracker</h1>
              <p className="logo-subtitle">Track Your Career Journey</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </Link>

            <Link to="/applications" className={`nav-link ${isActive('/applications') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"></path>
              </svg>
              Applications
           
            </Link>

            <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Browse Jobs
              <span className="nav-badge">3</span>
            </Link>

         

            <Link to="/cover-letter" className={`nav-link ${isActive('/cover-letter') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Cover Letter
            </Link>

         <Link to="/ai-assistant" className={`nav-link ${isActive('/ai-assistant') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 7.38 16.75 1 1 0 0 1-1.63-.33 1 1 0 0 1 .15-1.05A8 8 0 1 0 20 12"></path>
              <path d="M12 8v4l3 3"></path>
            </svg>
            AI Assistant
          </Link>
           <Link to="/about" className={`nav-link ${isActive('/ai-assistant') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 7.38 16.75 1 1 0 0 1-1.63-.33 1 1 0 0 1 .15-1.05A8 8 0 1 0 20 12"></path>
              <path d="M12 8v4l3 3"></path>
            </svg>
            about
          </Link>

            <Link to="/alertpage" className={`nav-link ${isActive('/alertpage') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 7.38 16.75 1 1 0 0 1-1.63-.33 1 1 0 0 1 .15-1.05A8 8 0 1 0 20 12"></path>
              <path d="M12 8v4l3 3"></path>
            </svg>
            AlertPage
          </Link>
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            <button className="icon-btn ai-btn" title="AI Assistant">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 0 1 7.38 16.75 1 1 0 0 1-1.63-.33 1 1 0 0 1 .15-1.05A8 8 0 1 0 20 12"></path>
                <path d="M12 8v4l3 3"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>

            <Link to="/profile" className="profile-link">
              <div className="profile-avatar">{userInitial}</div>
              <div className="profile-info">
                <p className="profile-name">{user.name || 'User'}</p>
                <p className="profile-email">{user.email || 'user@example.com'}</p>
              </div>
            </Link>

            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Dashboard
        </Link>

        <Link to="/applications" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"></path>
          </svg>
          Applications
          <span className="mobile-nav-badge">24</span>
        </Link>

        <Link to="/jobs" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Browse Jobs
          <span className="mobile-nav-badge">3</span>
        </Link>

        <Link to="/applications/new" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Add New Application
        </Link>

        <Link to="/cover-letter" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Cover Letter
        </Link>

        <Link to="/ai-assistant" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 0 1 7.38 16.75 1 1 0 0 1-1.63-.33 1 1 0 0 1 .15-1.05A8 8 0 1 0 20 12"></path>
            <path d="M12 8v4l3 3"></path>
          </svg>
          AI Assistant
        </Link>

        <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile
        </Link>

        <div className="mobile-nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </div>
      </div>
    </>
  );
};

export default Navbar;