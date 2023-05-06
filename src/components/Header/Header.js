import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <NavLink to="/" className="Header-text">
        Arshdeep Singh
      </NavLink>
    </div>
  );
};

export default Header;
