import React from 'react';
import './Navbar.css'; // This will link to our new styles

const Navbar = () => {
  return (
    // The main container now uses the "navbar" class
    <nav className="navbar">
      
      {/* The left section of links */}
      <div className="nav-left">
        <a href="#our-story" className="nav-link">Povestea noastra</a>
        <a href="#production" className="nav-link">Productie</a>
      </div>
      
      {/* The central logo, which acts as the home button */}
      <a href="/" className="nav-center">
        <h1 className="brand-title">La Cofetarie</h1>
        <p className="brand-subtitle">~~ since 2025 ~~</p>
      </a>

      {/* The right section of links */}
      <div className="nav-right">
        <a href="#products" className="nav-link">Produse</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>

    </nav>
  );
};

export default Navbar;