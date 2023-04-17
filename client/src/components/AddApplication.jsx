import { useState, useEffect, useRef } from "react";
import "../styles/AddApplication.css";
import "../styles/sdp.css";
import DatePicker from "sassy-datepicker";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategories,
  updateApplications,
} from "../redux/features/userSlice.js";
import { STATUSES } from "../utils/constants";
import Dropdown from "./Dropdown";
import { PlusCircle } from "react-feather";

const AddApplication = ({ handleSetVisibility }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarWrapperRef = useRef(null);
  const calendarRef = useRef(null);
  const userId = useSelector((state) => state.user._id);
  const categories = useSelector((state) => state.user.categories);
  const dispatch = useDispatch();

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
      id: "",
    },
    user: {
      id: userId,
    },
  });

  const handleStatusChange = (item) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      status: {
        value: item.value,
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
    setFormValues((prevValues) => ({
      ...prevValues,
      commute: {
        value: value,
      },
    }));
  };

  const handleDatePick = (date) => {
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
    try {
      const response = await axios.post(
        `/user/${userId}/application/newapplication`,
        newApplication
      );
      dispatch(updateApplications(response.data.data));
      handleSetVisibility(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };

  const handleCreateNewCategory = async (category) => {
    console.log(category);
    try {
      const response = await axios.put(
        `/user/${userId}/application/newcategory`,
        { value: category }
      );
      console.log(response.data.data);
      dispatch(updateCategories(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // Config object for status Dropdown list options
  const statusListConfig = {
    title: "Application status",
    listitems: STATUSES,
    handler: handleStatusChange,
    addNewItem: {
      isActive: false,
      description: "",
      icon: null,
      handler: null,
    },
  };

  const handleCategoryChange = (item) => {
    console.log(item);
    setFormValues((prevValues) => ({
      ...prevValues,
      category: {
        id: item._id,
      },
    }));
  };

  // Config object for category Dropdown list options
  const categoryListConfig = {
    title: "Role category",
    listitems: categories,
    handler: handleCategoryChange,
    addNewItem: {
      isActive: true,
      description: "Add new category",
      icon: <PlusCircle />,
      handler: handleCreateNewCategory,
    },
  };

  return (
    <form className="new-app-container" onSubmit={handleSubmit}>
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
        <Dropdown listConfig={categoryListConfig} />
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
            value={
              formValues.date.value
                ? formValues.date.value.toLocaleDateString()
                : ""
            }
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
        <Dropdown listConfig={statusListConfig} />
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
      <div className="form-actions">
        <button
          onClick={() => handleSetVisibility(false)}
          className="cancel-btn"
          type="button"
        >
          Cancel
        </button>
        <button className="submit-btn" type="submit">
          Save Application
        </button>
      </div>
    </form>
  );
};

export default AddApplication;
