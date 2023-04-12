import React, { useState } from "react";
import "../styles/Dashboard.css";
import Menu from "./Menu";

import { useSelector } from "react-redux";
import Content from "./Content";

const Dashboard = (props) => {
  console.log("%c dashboard component rendered", "color: green;");
  const categories = useSelector((state) => state.user.categories);
  const applications = useSelector((state) => state.user.applications);

  const [filteredApplications, setFilteredApplications] =
    useState(applications);

  const handleFilterByCategory = (category) => {
    const filteredApplications = applications.filter(
      (item) => item.category === category._id
    );
    setFilteredApplications(filteredApplications);
  };

  return (
    <div className="dashboard-container">
      <Menu handleFilter={handleFilterByCategory} categories={categories} />
      <Content applications={filteredApplications} />
    </div>
  );
};

export default Dashboard;
