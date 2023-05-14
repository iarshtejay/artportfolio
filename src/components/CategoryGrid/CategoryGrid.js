import React from "react";
import "./CategoryGrid.css";
import categories from "../../data/categories.json";
import { Link, NavLink } from "react-router-dom";
import icons from "../../icons/icons";

const CategoryGrid = ({ isHome }) => {
  return (
    <div>
      {isHome && <p className="CategoryGrid-header">Categories</p>}
      <div className="CategoryGrid-container">
        {categories.map((category) => {
          return (
            <NavLink
              to={`/category/${category.toLocaleLowerCase()}`}
              end
              className={({ isActive }) => {
                return isActive
                  ? "CategoryGrid-link-active"
                  : "CategoryGrid-link";
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
