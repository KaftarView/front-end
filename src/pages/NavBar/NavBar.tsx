
import React, { useEffect, useState } from "react";
import React, { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../public/ElmosLogo.png";
import NavLinks from "./NavLinks";
import "./NavBar.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { name: string };
    }
  }
}

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  
//   useEffect(() => {
//     // Check login state from localStorage
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loggedIn);

//     // Save last loaded page for redirect after login
//     // if (location.pathname !== "/Login" && location.pathname !== "/signup") {
//       // localStorage.setItem("lastPage", location.pathname);
//     // }
//   }, [location]);


  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
        <div className="ButtonNav">
          {/* Login/Register or Profile Icon */}
          <div className="auth-container">
            {isLoggedIn ? (
              <Link to="/profile" title="Profile">
                <ion-icon
                  name="person-circle-outline"
                  className="profile-icon"
                ></ion-icon>
              </Link>
            ) :  (
              <button onClick={handleSignupRedirect} className="auth-buttonNav">
                ثبت نام / ورود
              </button>
            )}
            </div>

          </div>

          {/* Center with Navigation Links */}
          <ul className="nav-links">
            <NavLinks />
          </ul>

          {/* Logo on the right side */}
          <div className="logo-container">
            <img src={logo} alt="logo" className="logoNav" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

