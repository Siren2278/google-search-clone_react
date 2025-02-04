import React from 'react';
import '../styles/Footer.css';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h5 className="footer-title">About SearchWave</h5>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#how">How Search Works</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5 className="footer-title">Products</h5>
            <ul className="footer-links">
              <li><a href="#business">Business Solutions</a></li>
              <li><a href="#advertising">Advertising</a></li>
              <li><a href="#developers">Developers</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5 className="footer-title">Connect</h5>
            <div className="social-links">
              <a href="#twitter" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#linkedin" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#github" className="social-link">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-logo__search">Search</span>
            <span className="brand-logo__wave">Wave</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} SearchWave. All rights reserved.
          </p>
          <div className="footer-location">
            <i className="fas fa-globe-americas"></i>
            <select className="footer-language-select">
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;