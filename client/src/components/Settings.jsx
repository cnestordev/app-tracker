import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import ColorToggle from "./ColorToggle";
import "../styles/Settings.css";
import { Trash } from "react-feather";
import { handlePurgeContent } from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/features/messageSlice";
import { SUCCESS } from "../utils/constants";
import { DANGER } from "../utils/constants";
import { login } from "../redux/features/userSlice";

const Settings = (props) => {
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const handleDeleteAction = async () => {
    try {
      const response = await handlePurgeContent(userId);
      const message = response.data.message;
      const updatedUser = response.data.data;
      dispatch(login(updatedUser));
      dispatch(setMessage({ message, type: SUCCESS }));
    } catch (error) {
      const message = error.response.data.message;
      dispatch(setMessage({ message, type: DANGER }));
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-body">
        <div className="settings-item">
          <span className="item-title">
            <h3>Dark Mode</h3>
          </span>
          <div className="item-action">
            <DarkModeToggle />
          </div>
        </div>
        <div className="settings-item">
          <span className="item-title">
            <h3>Color Mode</h3>
          </span>
          <div className="item-action">
            <ColorToggle />
          </div>
        </div>
        <div className="settings-item">
          <span className="item-title">
            <h3>Purge Content</h3>
          </span>
          <div onClick={() => handleDeleteAction()} className="item-action">
            <Trash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
