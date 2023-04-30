import React from "react";
import "./CategoryGrid.css";
import categories from "../../data/categories.json";
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  return (
    <div className="CategoryGrid-container">
      {categories.map((category) => {
        return (
          <div className="CategoryGrid-item">
            <Link to={`/${category.toLocaleLowerCase()}`}>
              <p className="CategoryGrid-link">{category}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
