
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/ElmosLogo.png";
import "./NavBar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left-Aligned Login/Register Button */}
        <div className="auth-container">
          <button onClick={handleSignupRedirect} className="auth-buttonNav">
            ثبت نام / ورود
          </button>
        </div>

        {/* Logo Section */}
        <div className="logo-container">
          <img src={logo} alt="logo" className="logoNav" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link to="/">رویداد </Link>
          </li>
          <li>
            <Link to="/magazine">نشریه</Link>
          </li>
          <li>
            <Link to="/news">پادکست</Link>
          </li>
          <li>
            <Link to="/gallery">گالری</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
