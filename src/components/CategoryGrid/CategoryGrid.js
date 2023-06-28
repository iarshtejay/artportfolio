import React, { useState } from "react";
import "./CategoryGrid.css";
import categories from "../../data/categories.json";
import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../icons/icons";

const CategoryGrid = ({ isHome }) => {
  const navigate = useNavigate();
  const [expandBar, setExpandBar] = useState(true);
  const goBack = () => {
    navigate(-1);
    setExpandBar(true);
  };
  const toggleNavBar = () => setExpandBar((prevState) => !prevState);

  return (
    <div>
      {isHome && <p className="CategoryGrid-header">Categories</p>}
      <nav className="CategoryGrid-bar hamburger">
        {!isHome && (
          <div className={"bar-item"} onClick={goBack}>
            <img
              src={icons["leftarrow"]}
              className={`CategoryGrid-icon-condensed`}
              alt="back"
              width={"30em"}
            />
          </div>
        )}
        {!isHome && (
          <div className={"bar-item"} onClick={toggleNavBar}>
            <img
              src={icons["hamburger"]}
              className={`CategoryGrid-icon-condensed`}
              alt="menu"
              width={"30em"}
            />
          </div>
        )}
      </nav>
      <div
        className={`CategoryGrid-container ${
          expandBar && !isHome /*&& !className_.endsWith("-active")*/ ? " compact" : ""
        }`}
      >
        {!isHome && (
          <div className={"CategoryGrid-item-condensed compact"} onClick={goBack}>
            <img
              src={icons["leftarrow"]}
              className={`CategoryGrid-icon-condensed`}
              alt="back"
              width={"30em"}
            />
          </div>
        )}
        {categories.map((category) => {
          return (
            <NavLink
              to={`/category/${category.toLocaleLowerCase()}`}
              end
              className={({ isActive }) => {
                let className_ = isActive
                  ? "CategoryGrid-link-active"
                  : "CategoryGrid-link";
                return className_;
              }}
            >
              <div className={`CategoryGrid-item${isHome ? "" : "-condensed"}`}>
                <img
                  src={icons[category.toLowerCase().replace("-", "")]}
                  className={`CategoryGrid-icon${isHome ? "" : "-condensed"}`}
                />
                <p>
                  <div className="CategoryGrid-link-highlight" />
                  {category}
                </p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
