import React from "react";
import "./Footer.css";
import { Link, NavLink } from "react-router-dom";
import icons from "../../icons/icons";

const Footer = () => {
  const socials = [
    {
      icon: icons.linkedin,
      href: "https://www.linkedin.com/in/arshdeep-singh09/",
      name: "LinkedIn",
    },
    {
      icon: icons.github,
      href: "https://github.com/iarshtejay/artportfolio",
      name: "Source Code",
    },
    { icon: icons.mail, href: "mailto:arshtejay@gmail.com", name: "e-mail" },
  ];
  const renderSocials = () => {
    return socials.map((social) => (
      <div>
        <a
          href={social.href}
          role="Button"
          aria-label={`Link to ${social.name}`}
          tabIndex={0}
        >
          <img className="Footer-icon" src={social.icon} alt="" />
        </a>
        <span>{"   "}</span>
      </div>
    ));
  };

  return (
    <div className="Footer">
      <span className="Footer-text">{"Find me on    "}</span>
      {renderSocials()}
    </div>
  );
};

export default Footer;
