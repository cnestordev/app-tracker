import Dropdown from "./Dropdown";
import axios from "axios";
import { COLOR_OPTIONS } from "../utils/constants";
import "../styles/ColorToggle.css";
import { login, updateUserTheme } from "../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";

const ColorToggle = (props) => {
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const handleColorChange = async (value) => {
    try {
      if (userId) {
        // There is a logged-in user, so update their theme
        const response = await axios.put(`/user/${userId}/toggleColorTheme`, {
          type: value,
        });
        dispatch(login(response.data.user));
      } else {
        // There is no logged-in user, so update the anonymous user
        dispatch(
          updateUserTheme({
            theme: { type: value },
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="color-toggle-container">
      {COLOR_OPTIONS.map((option) => {
        return (
          <div
            onClick={() => handleColorChange(option)}
            className={`color-option ${option}`}
          ></div>
        );
      })}
    </div>
  );
};

export default ColorToggle;
