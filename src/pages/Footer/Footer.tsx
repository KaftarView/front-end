
import React from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { IconType } from "react-icons";
import logo from "../../../public/ElmosLogo.png";
import "./Footer.css";

interface Section {
  title: string;
  items: string[];
}

interface Item {
  name: string;
  icon: IconType;
  link: string;
}

const section: Section[] = [
  {
    title: "تماس با ما",
    items: ["آدرس: دانشگاه علم و صنعت", " تلفن : 36456-021"],
  },
  {
    title: "درباره ما",
    items: ["تاریخچه", "اعضا انجمن"],
  },
];

const items: Item[] = [
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://www.facebook.com/",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/",
  },
  {
    name: "Github",
    icon: FaGithub,
    link: "https://www.github.com/",
  },
];

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* Left Text Sections */}
          <div className="footer-sections">
            {section.map((section, index) => (
              <div key={index}>
                <h6 className="footer-section-title">{section.title}</h6>
                <ul className="footer-list">
                  {section.items.map((item, i) => (
                    <li key={i} className="footer-list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Center Logo and Social Media */}
          <div className="footer-center">
            <img src={logo} alt="logo" className="footer-logo" />
            <p className="footer-social-text">
              ما را در شبکه‌های اجتماعی دنبال کنید
            </p>
            <div className="footer-icons">
              {items.map((x, index) => {
                const IconComponent = x.icon as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <a
                    key={index}
                    href={x.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon-link"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
