import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import "../styles/Dropdown.css";
import { useSelector } from "react-redux";

const Dropdown = ({ listConfig }) => {
  const addNewItem = listConfig.addNewItem;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const theme = useSelector((state) => state.user.theme.type);

  const handleItemSelection = (item) => {
    setSelectedItem(item.value);
    listConfig.handler(item);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addNewItem.handler(event.target.value);
      event.preventDefault();
    }
  };

  return (
    <div className={`dropdown-container ${theme}`}>
      <div className="dropdown-header" onClick={handleToggle}>
        <span className="selected-item">
          {selectedItem || listConfig.title || "title prop"}
        </span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {addNewItem.isActive && (
            <div className="new-list-item">
              {addNewItem.icon}
              <input
                type="text"
                placeholder={addNewItem.description}
                onKeyDown={handleKeyPress}
              />
            </div>
          )}
          {listConfig.listitems.map((item, index) => {
            return (
              <span
                key={item._id}
                onClick={() => handleItemSelection(item)}
                className="dropdown-item"
              >
                {item.value}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
