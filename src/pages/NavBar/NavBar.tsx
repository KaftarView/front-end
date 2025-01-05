// import React, { useEffect, useState } from "react";


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/ElmosLogo.png";
import "./NavBar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); 

  const handleSignupRedirect = () => {
    navigate("/signup");
  };
  const handleProfileRedirect = () => {
    navigate("/my-events");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left-Aligned Login/Register Button */}
        <div className="auth-container">
        {isAuthenticated ? (
            <button onClick={handleProfileRedirect} className="profile-icon">
              <AccountCircleIcon
                style={{ fontSize: "36px", color: "#f68b18" }}
              />
            </button>
          ) : (
            <button onClick={handleSignupRedirect} className="auth-buttonNav">
              ثبت نام / ورود
            </button>
          )}
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
            <Link to="/events">رویداد </Link>
          </li>
          <li>
            <Link to="/magazines">نشریه</Link>
          </li>
          <li>
            <Link to="/news-page">اخبار</Link>
          </li>
          <li>
            <Link to="/podcasts">پادکست</Link>
          </li>

          <li>
            <Link to="/members">اعضا </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
