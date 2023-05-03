import React from "react";
import "./CategoryGrid.css";
import categories from "../../data/categories.json";
import { Link } from "react-router-dom";
import icons from "../../icons/icons";

const CategoryGrid = () => {
  const currentPath = window.location.pathname;

  return (
    <div>
      {currentPath === "/" && <p className="CategoryGrid-header">Categories</p>}
      <div className="CategoryGrid-container">
        {categories.map((category) => {
          return (
            <Link to={`/category/${category.toLocaleLowerCase()}`}>
              <div
                className={`CategoryGrid-item${
                  currentPath !== "/" ? "-condensed" : ""
                }`}
              >
                <img
                  src={icons[category.toLowerCase().replace("-", "")]}
                  className={`CategoryGrid-icon${
                    currentPath !== "/" ? "-condensed" : ""
                  }`}
                />
                <p className="CategoryGrid-link">{category}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
