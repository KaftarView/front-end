import React, { useState } from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";

const NavbarPersonalInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("اطلاعات پروفایل");

  return (
    <div className="navbarPersonal">
      <Link
         to="/personal-info"
        className={`navbar-itemPersonal ${activeTab === "اطلاعات پروفایل" ? "active" : ""}`}
        onClick={() => setActiveTab("اطلاعات پروفایل")}
      >
        اطلاعات پروفایل
      </Link>
      <Link
        to="/ChangePassword"
        className={`navbar-itemPersonal ${activeTab === "اطلاعات رمز عبور" ? "active" : ""}`}
        onClick={() => setActiveTab("اطلاعات رمز عبور")}
      >
        تغییر رمز عبور
      </Link>
    </div>
  );
};

export default NavbarPersonalInfo;

