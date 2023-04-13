import { useState } from "react";
import "../styles/Menu.css";
import { Plus, Settings, LogOut } from "react-feather";
import Category from "./Category";

const Menu = ({ handleFilter, categories, activeCategory }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    setToggleMenu(false);
    alert("logged out");
  };

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
                activeCategory={activeCategory}
              />
            );
          })}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setToggleMenu(!toggleMenu);
        }}
        className="menu-footer"
      >
        <div className={`user-settings ${toggleMenu ? "active" : "hidden"}`}>
          <div onClick={() => handleLogout()} className="user-setting">
            <LogOut />
            <span>Sign Out</span>
          </div>
          <div className="user-setting">
            <Plus />
            <span>Sign Out</span>
          </div>
        </div>
        <Settings />
        <h2>User</h2>
      </div>
    </div>
  );
};

export default Menu;
