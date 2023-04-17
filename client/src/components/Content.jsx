import { useState } from "react";
import "../styles/Content.css";
import { DATE, HEADERS, LOCATION } from "../utils/constants";
import { Settings } from "react-feather";

const Content = ({ applications }) => {
  const [headers] = useState(HEADERS);

  console.log(applications);

  return (
    <div className="content-container">
      <div className="content-header">
        <div className="header-title">
          <h3>Front End Roles</h3>
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

      {applications.map((app, i) => {
        return (
          <div className="table-row" key={i}>
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
