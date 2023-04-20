import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/Settings.css";
import { Sun } from "react-feather";

const Settings = (props) => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-body">
        <div className="settings-item">
          <span className="item-title">
            <Sun />
            <h3>Dark Mode</h3>
          </span>
          <div className="item-action">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
