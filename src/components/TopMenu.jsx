import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopMenu = () => {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Account Info Bar */}
      <section className="torch-account-info">
        <div className="torch-container">
          <a href="/profile">yon.yusuf@thoughtfull.world</a>
          <a href="/change-password">Change Password</a>
          <a href="/logout">Logout</a>
        </div>
      </section>

      {/* Main Navigation */}
      <nav className="torch-topnav">
        <ul className="torch-nav-list">
          {/* Logo Area */}
          <li className="torch-logo">
            <a href="/">
              <img 
                src="https://tfw-public.s3.ap-southeast-1.amazonaws.com/logo.png" 
                alt="Thoughtfull Logo" 
              />
            </a>
          </li>

          <li className={`torch-nav-item ${isActive('/subscription') ? 'torch-active' : ''}`}>
            <Link to="/subscription" className="torch-link">Subscription</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/timesheet') ? 'torch-active' : ''}`}>
            <Link to="/timesheet" className="torch-link">Timesheet</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/user-list') ? 'torch-active' : ''}`}>
            <Link to="/user-list" className="torch-link">User List</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/profs') ? 'torch-active' : ''}`}>
            <Link to="/profs" className="torch-link">Profs</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/medpros') ? 'torch-active' : ''}`}>
            <Link to="/medpros" className="torch-link">Medpros</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/promotions') ? 'torch-active' : ''}`}>
            <Link to="/promotions" className="torch-link">Promotions</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/organizations') ? 'torch-active' : ''}`}>
            <Link to="/organizations" className="torch-link">Organizations</Link>
          </li>
          <li className={`torch-nav-item torch-dropdown ${isAnnouncementOpen ? 'torch-active' : ''}`}>
            <Link to="#" className="torch-link" onClick={(e) => { e.preventDefault(); setIsAnnouncementOpen(!isAnnouncementOpen); }}>
              Announcement
              <span className="torch-dropdown-arrow">▼</span>
            </Link>
            <div className={`torch-dropdown-content ${isAnnouncementOpen ? 'open' : ''}`}>
              <Link to="/broadcast">Broadcast</Link>
              <Link to="/notifications">Notifications</Link>
            </div>
          </li>
          <li className={`torch-nav-item ${isActive('/packs') ? 'torch-active' : ''}`}>
            <Link to="/packs" className="torch-link">Packs</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/video-therapy') ? 'torch-active' : ''}`}>
            <Link to="/video-therapy" className="torch-link">Video Therapy</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/holidays') ? 'torch-active' : ''}`}>
            <Link to="/holidays" className="torch-link">Holidays</Link>
          </li>
          <li className={`torch-nav-item ${isActive('/credits') ? 'torch-active' : ''}`}>
            <Link to="/credits" className="torch-link">Credits</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopMenu;
