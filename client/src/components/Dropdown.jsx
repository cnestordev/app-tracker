import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import "../styles/Dropdown.css";

const Dropdown = ({ title, listitems = [], selectedHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemSelection = (item) => {
    setSelectedItem(item);
    selectedHandler(item);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={handleToggle}>
        <span className="selected-item">
          {selectedItem || title || "title prop"}
        </span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {listitems.map((item) => {
            return (
              <span
                key={item}
                onClick={() => handleItemSelection(item)}
                className="dropdown-item"
              >
                {item}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
