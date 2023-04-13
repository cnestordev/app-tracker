import { useState, useEffect, useRef } from "react";
import "../styles/AddApplication.css";
import "../styles/sdp.css";
import DatePicker from "sassy-datepicker";

const AddApplication = (props) => {
  const [formValues, setFormValues] = useState({
    roleName: "",
    companyName: "",
    location: "",
    date: "",
    status: "",
    description: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarWrapperRef = useRef(null);
  const calendarRef = useRef(null);

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
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDatePick = (date) => {
    console.log(date.toLocaleDateString());
    setFormValues((prevValues) => ({
      ...prevValues,
      date: date.toLocaleDateString(),
    }));
    setShowCalendar(false);
  };

  const handleCalendarToggle = () => {
    setShowCalendar(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the form values to the backend or perform any necessary actions
    console.log(formValues);
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <form className="new-app-container" onSubmit={handleSubmit}>
      <h2 className="new-app-heading">AddApplication</h2>
      <div className="new-app-input">
        <input
          placeholder="role name"
          type="text"
          name="roleName"
          value={formValues.roleName}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <input
          placeholder="company name"
          type="text"
          name="companyName"
          value={formValues.companyName}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <input
          placeholder="location"
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleInputChange}
        />
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
            value={formValues.date}
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
        <input
          placeholder="status"
          type="text"
          name="status"
          value={formValues.status}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-app-input">
        <textarea
          className="job-info-textarea"
          placeholder="post job description here"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button type="submit">Add Application</button>
    </form>
  );
};

export default AddApplication;
