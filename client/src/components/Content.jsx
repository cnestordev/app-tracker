import { useState } from "react";
import "../styles/Content.css";
import {
  CREATE,
  DATE,
  HEADERS,
  INFO,
  LOCATION,
  VIEW,
  COMMUTE,
} from "../utils/constants";
import { Settings } from "react-feather";
import {
  deselectApplication,
  selectApplication,
} from "../redux/features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import hybrid from "../assets/hybrid.svg";
import remote from "../assets/home.svg";
import onsite from "../assets/building.svg";
import edit from "../assets/edit.svg";

const Content = ({
  handleVisibility,
  setAppVisibility,
  applications,
  setComponentName,
  activeCategory,
}) => {
  const [headers] = useState(HEADERS);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.user.theme.type);

  const handleSelectedApplication = async (application) => {
    dispatch(deselectApplication());
    dispatch(selectApplication(application));
    setComponentName(VIEW);
    // handleVisibility will mount or unmount the component
    handleVisibility(true);
    // setAppVisibility will trigger the animation to display or "hide" the component
    setAppVisibility(true);
  };

  const recursiveSearch = (obj, term) => {
    // if an application's property is a nested objects, loop through the fn again to check it's nested values.
    if (typeof obj === "object") {
      for (let prop in obj) {
        if (recursiveSearch(obj[prop], term)) {
          return true;
        }
      }
      // if the application's property is not a nested object, check the value of the property
    } else if (typeof obj === "string") {
      return obj.toLowerCase().includes(term.toLowerCase());
    }
    return false;
  };

  const filteredApplications = applications.filter((app) => {
    // hide applications with their isHidden property set to true
    if (app.isHidden && app.isHidden.value) {
      return false;
    }

    for (let prop in app) {
      if (app[prop].isShown && recursiveSearch(app[prop].value, searchTerm)) {
        return true;
      }
    }
    return false;
  });

  const title = activeCategory ? activeCategory.value : "Job Applications";

  const handleEditForm = (e, app) => {
    e.stopPropagation();
    dispatch(selectApplication(app));
    setComponentName(CREATE);
    handleVisibility(true);
    setAppVisibility(true);
  };

  const renderIcon = (key, value, app, i) => {
    const COMMUTE_ICONS = {
      onsite: onsite,
      hybrid: hybrid,
      remote: remote,
    };

    if (key === INFO) {
      return (
        <div className="header-item" onClick={(e) => handleEditForm(e, app)}>
          <img src={edit} alt="info" />
        </div>
      );
    }
    if (key === COMMUTE) {
      const icon = COMMUTE_ICONS[value];
      return (
        <div className="header-item" key={`${key}-${i}`}>
          <img src={icon} alt={value} />
        </div>
      );
    }
  };

  return (
    <div className={`content-container ${theme}`}>
      <div className="content-header">
        <div className="header-title">
          <h3>{title}</h3>
          <input
            className="searchbar"
            type="text"
            placeholder="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="header-settings">
          <Settings />
        </div>
      </div>
      <div className="table-header">
        {headers.map((header, i) => {
          return (
            <div key={i} className="header-item">
              {header}
            </div>
          );
        })}
      </div>

      {filteredApplications.map((app, i) => {
        return (
          <div
            onClick={() => handleSelectedApplication(app)}
            className="table-row"
            key={i}
          >
            {Object.keys(app)
              .filter((key) => app[key].isShown)
              .map((key) => {
                if (key === LOCATION) {
                  const city = app.location.city.value;
                  const state = app.location.state.value;
                  return (
                    <div key={`${key}-${i}`} className="header-item">
                      {`${city}, ${state}`}
                    </div>
                  );
                } else if (key === DATE) {
                  const date = new Date(app[key].value);
                  const formattedDate = date.toLocaleDateString("en-US");
                  return (
                    <div key={`${key}-${i}`} className="header-item">
                      {formattedDate}
                    </div>
                  );
                } else if (key === INFO || key === COMMUTE) {
                  const value = app[key].value;
                  return renderIcon(key, value, app, i);
                } else {
                  const value = app[key].value;
                  return (
                    <div key={`${key}-${i}`} className="header-item">
                      {value}
                    </div>
                  );
                }
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Content;
