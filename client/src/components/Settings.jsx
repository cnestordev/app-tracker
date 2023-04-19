import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/Settings.css";

const Settings = (props) => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-body">
        <div className="settings-item">
          <h3>Dark Mode</h3>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Settings;
