import React from "react";
import "../styles/Dashboard.css";
import Menu from "./Menu";

const Dashboard = (props) => {
  console.log("%c dashboard component rendered", "color: green;");
  return (
    <div className="dashboard-container">
      <Menu />
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
