
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

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Login/Register or Profile Icon */}
          <div className="auth-container">
            {isLoggedIn ? (
              <Link to="/profile" title="Profile">
                <ion-icon
                  name="person-circle-outline"
                  className="profile-icon"
                ></ion-icon>
              </Link>
            ) : (
              <button onClick={handleSignupRedirect} className="auth-buttonNav">
                ثبت نام / ورود
              </button>
            )}
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



