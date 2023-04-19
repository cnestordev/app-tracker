import { useState, useRef, useEffect } from "react";
import "../styles/Menu.css";
import { Plus, LogOut, User } from "react-feather";
import Category from "./Category";
import { handleLogout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACTIVE, CREATE, DANGER, HIDDEN, SUCCESS } from "../utils/constants";

import { useDispatch } from "react-redux";
import { deselectApplication } from "../redux/features/applicationSlice";
import { setMessage } from "../redux/features/messageSlice";

const Menu = ({
  handleFilter,
  activeCategory,
  setAppVisibility,
  handleVisibility,
  setComponentName,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuFooterRef = useRef(null);
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const userCategories = useSelector((state) => state.user.categories);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(userCategories);
  }, [userCategories]);

  const dispatch = useDispatch();

  const handleCreateClick = () => {
    dispatch(deselectApplication());
    setComponentName(CREATE);
    handleVisibility(true);
    setAppVisibility(true);
  };

  const handleUserLogout = async () => {
    setToggleMenu(false);
    try {
      const res = await handleLogout();
      console.log(res);
      navigate("/login");
      const message = res.data.message;
      dispatch(setMessage({ message, type: SUCCESS }));
    } catch (error) {
      const message = error.response.data.message;
      dispatch(setMessage({ message, type: DANGER }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuFooterRef.current &&
        !menuFooterRef.current.contains(e.target) &&
        toggleMenu
      ) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuFooterRef, toggleMenu]);

  return (
    <div className="menu-container light blue">
      <div className="menu-header">
        <h2>Dashboard</h2>
        <button onClick={() => handleCreateClick()}>
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
        ref={menuFooterRef}
        onClick={(e) => {
          e.stopPropagation();
          setToggleMenu(!toggleMenu);
        }}
        className="menu-footer"
      >
        <div className={`user-settings ${toggleMenu ? ACTIVE : HIDDEN}`}>
          <div onClick={() => handleUserLogout()} className="user-setting">
            <LogOut />
            <span>Sign Out</span>
          </div>
          <div className="user-setting">
            <Plus />
            <span>Sign Out</span>
          </div>
        </div>
        <User />
        <h2>{username}</h2>
      </div>
    </div>
  );
};

export default Menu;
