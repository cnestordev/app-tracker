import React from "react";
import "../styles/Dashboard.css";

const Dashboard = (props) => {
  console.log("%c dashboard component rendered", "color: green;");
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
