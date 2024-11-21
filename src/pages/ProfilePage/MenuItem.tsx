
import React from "react";
import "./MenuItem.css"; 

interface MenuItemProps {
  title: string;
  icon: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, link }) => {
  return (
    <a href={link} className="menu-item">
      <img src={icon} alt={title} className="menu-item-icon" />
      <span className="menu-item-title">{title}</span>
    </a>
  );
};

export default MenuItem;
