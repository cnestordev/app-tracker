import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import Menu from "./Menu";
import Content from "./Content";

import { useSelector } from "react-redux";
import View from "./View";
import { CREATE } from "../utils/constants";

const Dashboard = (props) => {
  const applications = useSelector((state) => state.user.applications);

  // the selected category to filter by
  const [activeCategory, setActiveCategory] = useState("");
  const [filteredApplications, setFilteredApplications] =
    useState(applications);

  // control visibility animations
  const [appVisibility, setAppVisibility] = useState(false);
  const [isMounted, setIsMoutned] = useState(false);
  // string for determining which component gets displayed
  const [componentName, setComponentName] = useState(CREATE);

  const theme = useSelector((state) => state.user.theme.type);

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

  useEffect(() => {
    handleFilterByCategory(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications]);

  const handleVisibility = (value) => {
    setIsMoutned(value);
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <Menu
        activeCategory={activeCategory}
        handleFilter={handleFilterByCategory}
        setAppVisibility={setAppVisibility}
        handleVisibility={handleVisibility}
        setComponentName={setComponentName}
      />
      <Content
        handleVisibility={handleVisibility}
        applications={filteredApplications}
        setAppVisibility={setAppVisibility}
        setComponentName={setComponentName}
        activeCategory={activeCategory}
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
