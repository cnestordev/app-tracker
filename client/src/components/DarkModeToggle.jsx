import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login, updateUserTheme } from "../redux/features/userSlice";
import { LIGHT, DARK } from "../utils/constants";
import { ToggleLeft, ToggleRight } from "react-feather";

import "../styles/DarkModeToggle.css";

const DarkModeToggle = ({ component }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentDarkModeTheme = user.theme.type;
  const userId = user._id;

  const handleToggle = async () => {
    const newTheme = currentDarkModeTheme === LIGHT ? DARK : LIGHT;
    try {
      if (userId) {
        // There is a logged-in user, so update their theme
        const response = await axios.put(`/user/${userId}/toggledarkmode`, {
          type: newTheme,
        });
        dispatch(login(response.data.user));
      } else {
        // There is no logged-in user, so update the anonymous user
        dispatch(
          updateUserTheme({
            theme: { type: newTheme },
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleClasses = `dark-mode-toggle ${component ? component : ""}`;

  return (
    <span className={toggleClasses} onClick={() => handleToggle()}>
      {currentDarkModeTheme === DARK ? <ToggleRight /> : <ToggleLeft />}
    </span>
  );
};

export default DarkModeToggle;
