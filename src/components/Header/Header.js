import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <div>
        <NavLink to="/">
          <div className="Header-highlight" />
          <span className="Header-text">Arsh   </span>
          <span className="Header-text-punjabi">ਅਰਸ਼</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
