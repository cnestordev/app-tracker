import { useState, useEffect, useRef } from "react";
import "../styles/AddApplication.css";
import "../styles/sdp.css";
import DatePicker from "sassy-datepicker";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  ACCEPTED,
  APPLIED,
  FIRST_INTERVIEW,
  JOB_OFFER,
  REJECTED,
  SECOND_INTERVIEW,
  STATUSES,
  THIRD_INTERVIEW,
} from "../utils/constants";
import Dropdown from "./Dropdown";

const AddApplication = ({ appVisibility }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarWrapperRef = useRef(null);
  const calendarRef = useRef(null);
  const userId = useSelector((state) => state.user._id);

  const [formValues, setFormValues] = useState({
    role: {
      value: "",
    },
    company: {
      value: "",
    },
    location: {
      value: "",
    },
    date: {
      value: "",
    },
    source: {
      value: "",
    },
    status: {
      value: "",
    },
    commute: {
      value: "",
    },
    info: {
      value: "",
    },
    category: {
      id: "643881e7b9e21479a1f77c67",
    },
    user: {
      id: userId,
    },
  });

  const handleStatusChange = (item) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      status: {
        value: item,
      },
    }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarWrapperRef.current &&
        !calendarWrapperRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarWrapperRef]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        value: value,
      },
    }));
  };

  const handleCommuteChange = (value) => {
    console.log(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      commute: {
        value: value,
      },
    }));
    console.log(formValues);
  };

  const handleDatePick = (date) => {
    console.log(date.toLocaleDateString());
    setFormValues((prevValues) => ({
      ...prevValues,
      date: {
        value: date,
      },
    }));
    setShowCalendar(false);
  };

  const handleCalendarToggle = () => {
    setShowCalendar(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [city, state] = formValues.location.value.split(", ");
    const newApplication = {
      ...formValues,
      location: {
        city: {
          value: city,
        },
        state: {
          value: state,
        },
      },
    };
    console.log(newApplication);
    try {
      const response = await axios.post(
        `/user/${userId}/newapplication`,
        newApplication
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <form
      className={`new-app-container ${appVisibility ? "active" : "hidden"}`}
      onSubmit={handleSubmit}
    >
      <h2 className="new-app-heading">AddApplication</h2>
      <div className="new-app-input">
        <input
          placeholder="role name"
          type="text"
          name="role"
          value={formValues.role.value}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <input
          placeholder="company name"
          type="text"
          name="company"
          value={formValues.company.value}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <input
          placeholder="location"
          type="text"
          name="location"
          value={formValues.location.value}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <input
          placeholder="source"
          type="text"
          name="source"
          value={formValues.source.value}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <div className="radio-options">
          <div
            className={`radio-input ${
              formValues.commute.value === "remote" ? "active" : ""
            }`}
            role="radio"
            tabIndex={0}
            aria-checked="true"
            onClick={(e) => handleCommuteChange("remote")}
          >
            Remote
          </div>
          <div
            className={`radio-input ${
              formValues.commute.value === "onsite" ? "active" : ""
            }`}
            role="radio"
            tabIndex={0}
            aria-checked="true"
            onClick={(e) => handleCommuteChange("onsite")}
          >
            Onsite
          </div>
          <div
            className={`radio-input ${
              formValues.commute.value === "hybrid" ? "active" : ""
            }`}
            role="radio"
            tabIndex={0}
            aria-checked="true"
            onClick={(e) => handleCommuteChange("hybrid")}
          >
            Hybrid
          </div>
        </div>
      </div>
      <div className="new-app-input">
        <div
          ref={calendarWrapperRef}
          onClick={() => handleCalendarToggle()}
          style={{ position: "relative" }}
        >
          <input
            disabled
            placeholder="date"
            type="text"
            name="date"
            value={formValues.date.value}
            onChange={handleInputChange}
          />
          {showCalendar && (
            <div onClick={handleCalendarClick}>
              <DatePicker
                ref={calendarRef}
                onChange={(e) => handleDatePick(e)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="new-app-input">
        <Dropdown
          title="Application Status"
          listitems={STATUSES}
          selectedHandler={handleStatusChange}
        />
      </div>
      <div className="new-app-input">
        <textarea
          className="job-info-textarea"
          placeholder="post job description here"
          name="info"
          value={formValues.info.value}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button className="submit-btn" type="submit">
        Save Application
      </button>
    </form>
  );
};

export default AddApplication;
