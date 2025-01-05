
import React from "react";
import "./ProfilePage.css";
import { FaCalendarAlt, FaCertificate, FaUser, FaSignOutAlt, FaKey} from "react-icons/fa";
import { useAuth } from "../../components/AuthContext"; 
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  const menuItems = [
    { title: "رویدادهای من", icon: <FaCalendarAlt />, link: "/my-events" },
    { title: " رمز", icon: <FaKey />, link: "/ChangePassword" },
    { title: "حساب کاربری", icon: <FaUser />, link: "/personal-info" },
    { title: "خروج", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="profile-page">
      <aside className="profile-aside">
        <div className="profile-header">
          <div className="profile-container">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/26c8d01ecaea3732c32e92cabda469bf8a96ff3d00e45d32737b1a5a5683202c?placeholderIfAbsent=true&apiKey=74dd80253d9244ddae80b45ff5ab670e"
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>
        <nav className="profile-nav">
          {menuItems.map((item, index) => (
            <a
              href={item.link || "#"}
              key={index}
              className="menu-item"
              onClick={item.action ? item.action : undefined} 
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-title">{item.title}</span>
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default ProfilePage;
