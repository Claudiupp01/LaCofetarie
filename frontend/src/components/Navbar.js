import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Use a function for the home button to match your example code's logic
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/povestea" className="nav-link">
          Povestea noastra
        </Link>
        <Link to="/productie" className="nav-link">
          Productie
        </Link>
      </div>

      <div className="nav-center" onClick={handleHomeClick}>
        <h1 className="brand-title">La Cofetarie</h1>
        <p className="brand-subtitle">~~ since 2025 ~~</p>
      </div>

      <div className="nav-right">
        <Link to="/produse" className="nav-link">
          Produse
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
