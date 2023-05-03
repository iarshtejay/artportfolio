import React from "react";
import "./CategoryGrid.css";
import categories from "../../data/categories.json";
import { Link } from "react-router-dom";
import icons from "../../icons/icons";

const CategoryGrid = () => {
  return (
    <div>
      <p className="CategoryGrid-header">Categories</p>
      <div className="CategoryGrid-container">
        {categories.map((category) => {
          return (
            <div className="CategoryGrid-item">
              <Link to={`/${category.toLocaleLowerCase()}`}>
                <img
                  src={icons[category.toLowerCase().replace("-", "")]}
                  className="CategoryGrid-icon"
                />
                <p className="CategoryGrid-link">{category}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
