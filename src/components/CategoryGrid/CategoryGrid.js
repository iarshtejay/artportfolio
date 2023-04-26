import React from "react";
import "./CategoryGrid.css";
import categories from "../../data/categories.json"


const CategoryGrid = () => {
  return (
    <div className="CategoryGrid-container">
      {categories.map((category) => {return(
        <div className="CategoryGrid-item">
            <a className="CategoryGrid-link" href={`/${category.toLocaleLowerCase()}`}>{category}</a>
        </div>
      )})}
    </div>
  );
};

export default CategoryGrid;
