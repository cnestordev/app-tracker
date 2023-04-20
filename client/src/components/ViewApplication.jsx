// import { useState, useEffect, useRef } from "react";
import "../styles/ViewApplication.css";
import { useSelector } from "react-redux";

const ViewApplication = ({ handleSetVisibility }) => {
  //   const dispatch = useDispatch();
  const app = useSelector((state) => state.application);
  const theme = useSelector((state) => state.user.theme.type);

  return (
    <div className={`view-app-container ${theme}`}>
      <div className="view-title">
        <h2 className="header">{app.role}</h2>
      </div>
      <div className="view-header">
        <div className="header-left">
          <h3 className="subheader company">{app.company}</h3>
          <h4 className="subheader location">{app.location}</h4>
        </div>
        <div className="header-right">
          <h5 className="metadata date">
            {new Date(app.date).toLocaleDateString()}
          </h5>
          <h5 className="metadata source">{app.source}</h5>
          <span className="view-app-status">{app.status}</span>
        </div>
      </div>
      <div className="view-body">
        <span>{app.info}</span>
      </div>
      <div className="view-footer">
        <button onClick={() => handleSetVisibility(false)}>Close</button>
      </div>
    </div>
  );
};

export default ViewApplication;
