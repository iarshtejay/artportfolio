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
  const renderCategories = () =>
    categories.map((category) => {
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
          tabIndex={0}
          role="Button"
          aria-label={`Visit ${category} category`}
        >
          <div
            className={`CategoryGrid-item${isHome ? "" : "-condensed"}`}
            alt=""
          >
            <img
              src={icons[category.toLowerCase().replace("-", "")]}
              className={`CategoryGrid-icon${isHome ? "" : "-condensed"}`}
              alt=""
            />
            <p>
              <div className="CategoryGrid-link-highlight" alt="" />
              {category}
            </p>
          </div>
        </NavLink>
      );
    });

  return (
    <div>
      {isHome && <p className="CategoryGrid-header">Categories</p>}
      {/* Back Icon and Hamburger Icon */}
      {!isHome && (
        <nav className="CategoryGrid-bar hamburger">
          <div
            className={"bar-item"}
            onClick={goBack}
            onKeyDown={e => e.key === "Enter" ? goBack() : null}
            tabIndex={0}
            role="Button"
            aria-label="Go to previous page"
          >
            <img
              src={icons["leftarrow"]}
              className={`CategoryGrid-icon-condensed`}
              alt=""
              width={"30em"}
            />
          </div>
          <div
            className={"bar-item"}
            onClick={toggleNavBar}
            onKeyDown={e => e.key === "Enter" ? toggleNavBar() : null}
            tabIndex={0}
            role="Button"
            aria-label="Go to previous page"
          >
            <img
              src={icons["hamburger"]}
              className={`CategoryGrid-icon-condensed`}
              alt=""
              width={"30em"}
            />
          </div>
        </nav>
      )}

      <div
        className={`CategoryGrid-container ${
          expandBar && !isHome /*&& !className_.endsWith("-active")*/
            ? " compact"
            : ""
        }`}
      >
        {/* Back button nav bar wide screen*/}
        {!isHome && (
          <div
            className={"CategoryGrid-item-condensed compact"}
            onClick={goBack}
            onKeyDown={e => e.key === "Enter" ? goBack() : null}
            tabIndex={0}
            role="Button"
            aria-label="Go to previous page"
          >
            <img
              src={icons["leftarrow"]}
              className={`CategoryGrid-icon-condensed`}
              alt=""
              width={"30em"}
            />
          </div>
        )}
        {renderCategories()}
      </div>
    </div>
  );
};

export default CategoryGrid;
