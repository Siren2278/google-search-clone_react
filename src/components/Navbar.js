/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'}`}>
      <div className="container">
        <a className="navbar-brand brand-logo" href="#">
          <span className="brand-logo__search">Search</span>
          <span className="brand-logo__wave">Wave</span>
        </a>
        <div className="navbar-actions">
          <button 
            className="btn theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button className="btn settings-btn">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;