import { useState, useEffect, useRef } from "react";
import "../styles/AddApplication.css";
import "../styles/sdp.css";
import DatePicker from "sassy-datepicker";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategories,
  updateApplications,
  replaceApplication,
  removeApplication,
} from "../redux/features/userSlice.js";
import {
  STATUSES,
  SUCCESS,
  FORM_VALUES,
  DANGER,
  ACTIVE,
} from "../utils/constants";
import Dropdown from "./Dropdown";
import { PlusCircle, Save, Trash, X } from "react-feather";
import { deselectApplication } from "../redux/features/applicationSlice";
import { setMessage } from "../redux/features/messageSlice";

const AddApplication = ({ handleSetVisibility }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarWrapperRef = useRef(null);
  const calendarRef = useRef(null);
  const userId = useSelector((state) => state.user._id);
  const categories = useSelector((state) => state.user.categories);
  const selectedApplication = useSelector((state) => state.application);
  const theme = useSelector((state) => state.user.theme.type);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(FORM_VALUES);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // if an application is selected, populate form with its values
    // and use isEditing to render the edit form instead of the "add new application" form.
    if (selectedApplication._id) {
      setIsEditing(true);
      setFormValues({
        role: {
          value: selectedApplication.role,
        },
        company: {
          value: selectedApplication.company,
        },
        location: {
          value: selectedApplication.location,
        },
        date: {
          value: new Date(selectedApplication.date),
        },
        source: {
          value: selectedApplication.source,
        },
        status: {
          value: selectedApplication.status,
        },
        commute: {
          value: selectedApplication.commute,
        },
        info: {
          value: selectedApplication.info,
        },
        _id: selectedApplication._id,
      });
    } else {
      setFormValues(FORM_VALUES);
      setIsEditing(false);
    }
  }, [selectedApplication]);

  const handleStatusChange = (item) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      status: {
        value: item.value,
      },
    }));
  };

  useEffect(() => {
    // click outside of the calendar to close it
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
      user: {
        id: userId,
      },
    };
    if (isEditing) {
      try {
        const response = await axios.put(
          `/user/${userId}/application/${formValues._id}/editapplication`,
          newApplication
        );
        dispatch(replaceApplication(response.data.data));
        handleSetVisibility(false);
        dispatch(setMessage({ message: response.data.message, type: SUCCESS }));
      } catch (error) {
        const message = error.response.data.message;
        dispatch(setMessage({ message, type: DANGER }));
      }
    } else {
      try {
        const response = await axios.post(
          `/user/${userId}/application/newapplication`,
          newApplication
        );
        dispatch(updateApplications(response.data.data));
        handleSetVisibility(false);
        dispatch(setMessage({ message: response.data.message, type: SUCCESS }));
      } catch (error) {
        const message = error.response.data.message;
        dispatch(setMessage({ message, type: DANGER }));
      }
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
      const message = response.data.message;
      dispatch(updateCategories(response.data.data));
      dispatch(setMessage({ message, type: SUCCESS }));
    } catch (error) {
      const message = error.response.data.message;
      dispatch(setMessage({ message, type: DANGER }));
    }
  };

  // Config object for status Dropdown list options
  // title = dropdown menu header name
  // listitems = array of items to display on the dropdown options
  // handler = cb function to handle when user clicks on option, passes the value as an argument
  // isActive = boolean value for determining whether to add option to add new dropdown option
  // description = placeholder instructions
  // icon = icon to display
  // handler = cb function that passes the value the user entered in text input
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

  // cancel (close modal) will:
  // deselect the applicaton
  // hide the applicaiton
  const handleCancelAction = () => {
    setIsEditing(false);
    dispatch(deselectApplication());
    handleSetVisibility(false);
  };

  const handleDeleteAction = async () => {
    try {
      const response = await axios.delete(
        `/user/${userId}/application/${formValues._id}/deleteapplication`
      );
      console.log(response.data);
      dispatch(setMessage({ message: response.data.message, type: SUCCESS }));
      dispatch(removeApplication(response.data.applicationId));
      handleCancelAction();
    } catch (error) {
      const message = error.response.data.message;
      dispatch(setMessage({ message, type: DANGER }));
    }
  };

  return (
    <form className={`new-app-container ${theme}`} onSubmit={handleSubmit}>
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
              formValues.commute.value === "remote" ? ACTIVE : ""
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
              formValues.commute.value === "onsite" ? ACTIVE : ""
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
              formValues.commute.value === "hybrid" ? ACTIVE : ""
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
          onClick={() => handleCancelAction()}
          className="cancel-btn"
          type="button"
        >
          <X />
          Cancel
        </button>
        {isEditing && (
          <button
            onClick={() => handleDeleteAction()}
            className="delete-btn"
            type="button"
          >
            <Trash />
            Delete
          </button>
        )}
        <button className="submit-btn" type="submit">
          <Save />
          Save
        </button>
      </div>
    </form>
  );
};

export default AddApplication;
