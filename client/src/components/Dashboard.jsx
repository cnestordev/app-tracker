import React, { useState } from "react";
import "../styles/Dashboard.css";
import Menu from "./Menu";
import Content from "./Content";

import { useSelector } from "react-redux";
import View from "./View";
import { CREATE } from "../utils/constants";

const Dashboard = (props) => {
  const categories = useSelector((state) => state.user.categories);
  const applications = useSelector((state) => state.user.applications);

  const [activeCategory, setActiveCategory] = useState("");
  const [filteredApplications, setFilteredApplications] =
    useState(applications);
  const [appVisibility, setAppVisibility] = useState(false);
  const [isMounted, setIsMoutned] = useState(true);
  const [componentName, setComponentName] = useState(CREATE);

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

  const handleVisibility = (value) => {
    setIsMoutned(value);
  };

  return (
    <div className="dashboard-container">
      <Menu
        activeCategory={activeCategory}
        handleFilter={handleFilterByCategory}
        categories={categories}
        setAppVisibility={setAppVisibility}
        handleVisibility={handleVisibility}
        setComponentName={setComponentName}
      />
      <Content
        handleVisibility={handleVisibility}
        applications={filteredApplications}
        setAppVisibility={setAppVisibility}
        setComponentName={setComponentName}
      />
      {isMounted && (
        <View
          setAppVisibility={setAppVisibility}
          appVisibility={appVisibility}
          handleVisibility={handleVisibility}
          componentName={componentName}
        />
      )}
    </div>
  );
};

export default Dashboard;
