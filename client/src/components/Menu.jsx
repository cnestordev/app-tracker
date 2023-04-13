import React from "react";
import "../styles/Menu.css";
import { Plus, Settings } from "react-feather";
import Category from "./Category";

const Menu = ({ handleFilter, categories }) => {
  console.log(categories);
  return (
    <div className="menu-container light">
      <div className="menu-header">
        <h2>Dashboard</h2>
        <button>
          <span>Create</span>
          <Plus />
        </button>
      </div>
      <div className="menu-body">
        <div className="categories-container">
          {categories.map((category) => {
            return (
              <Category
                handleFilter={handleFilter}
                key={category._id}
                category={category}
              />
            );
          })}
        </div>
      </div>
      <div className="menu-footer">
        <Settings />
        <h2>User</h2>
      </div>
    </div>
  );
};

export default Menu;
