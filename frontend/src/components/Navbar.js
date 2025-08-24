import React from 'react';
import './Navbar.css'; // We will create the styles in the next step

// Left to the Main button
    // Main button (Also the Home button)
// Right to the Main button
const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-section">
        <a href="#our-story" className="nav-button">Povestea noastra</a>
        <a href="#production" className="nav-button">Productie</a>
      </div>
      <div className="navbar-logo">
        <h1>La Cofetarie</h1>
        <p>~~ since 2025 ~~</p>
      </div>
      <div className="navbar-section">
        <a href="#products" className="nav-button">Produse</a>
        <a href="#contact" className="nav-button">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;