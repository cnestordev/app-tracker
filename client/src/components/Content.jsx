import { useCallback, useMemo, useState } from "react";
import "../styles/Content.css";
import {
  CREATE,
  DATE,
  HEADERS,
  INFO,
  LOCATION,
  VIEW,
} from "../utils/constants";
import { Settings, Edit } from "react-feather";
import {
  deselectApplication,
  selectApplication,
} from "../redux/features/applicationSlice";
import { useDispatch } from "react-redux";

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

  const handleSelectedApplication = useCallback(
    async (application) => {
      dispatch(deselectApplication());
      dispatch(selectApplication(application));
      setComponentName(VIEW);
      handleVisibility(true);
      setAppVisibility(true);
    },
    [dispatch, setComponentName, handleVisibility, setAppVisibility]
  );

  const recursiveSearch = useCallback((obj, term) => {
    if (typeof obj === "object") {
      for (let prop in obj) {
        if (recursiveSearch(obj[prop], term)) {
          return true;
        }
      }
    } else if (typeof obj === "string") {
      return obj.toLowerCase().includes(term.toLowerCase());
    }
    return false;
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      for (let prop in app) {
        if (app[prop].isShown && recursiveSearch(app[prop].value, searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }, [applications, recursiveSearch, searchTerm]);

  const title = activeCategory ? activeCategory.value : "Job Applications";

  const handleEditForm = useCallback(
    (e, app) => {
      e.stopPropagation();
      dispatch(selectApplication(app));
      setComponentName(CREATE);
      handleVisibility(true);
      setAppVisibility(true);
    },
    [dispatch, setComponentName, handleVisibility, setAppVisibility]
  );

  return (
    <div className="content-container light blue">
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
                } else if (key === INFO) {
                  return (
                    <div
                      onClick={(e) => handleEditForm(e, app)}
                      key={`${key}-${i}`}
                      className="header-item"
                    >
                      <Edit />
                    </div>
                  );
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
