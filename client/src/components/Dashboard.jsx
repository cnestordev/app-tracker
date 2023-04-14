import React, { useState } from "react";
import "../styles/Dashboard.css";
import Menu from "./Menu";
import Content from "./Content";

import { useSelector } from "react-redux";
import AddApplication from "./AddApplication";

const Dashboard = (props) => {
  console.log("%c dashboard component rendered", "color: green;");
  const categories = useSelector((state) => state.user.categories);
  const applications = useSelector((state) => state.user.applications);

  const [activeCategory, setActiveCategory] = useState("");
  const [filteredApplications, setFilteredApplications] =
    useState(applications);
  const [appVisibility, setAppVisibility] = useState(false);

  const handleFilterByCategory = (category) => {
    if (category._id === activeCategory._id) {
      setActiveCategory("");
      setFilteredApplications(applications);
    } else {
      setActiveCategory(category);
      const filteredApplications = applications.filter(
        (item) => item.category.id === category._id
      );
      setFilteredApplications(filteredApplications);
    }
  };

  return (
    <div className="dashboard-container">
      <Menu
        activeCategory={activeCategory}
        handleFilter={handleFilterByCategory}
        categories={categories}
        setAppVisibility={setAppVisibility}
      />
      <Content applications={filteredApplications} />
      <AddApplication appVisibility={appVisibility} />
    </div>
  );
};

export default Dashboard;
