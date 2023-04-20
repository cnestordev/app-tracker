import "../styles/View.css";
import { ACTIVE, CREATE, HIDDEN, SETTINGS, VIEW } from "../utils/constants";
import AddApplication from "./AddApplication";
import ViewApplication from "./ViewApplication";
import Settings from "./Settings";
import { useSelector } from "react-redux";

const View = ({
  appVisibility,
  handleVisibility,
  setAppVisibility,
  componentName,
}) => {
  const theme = useSelector((state) => state.user.theme.type);

  const handleAnimationEnd = () => {
    handleVisibility(false);
  };

  const handleSetVisibility = (value) => {
    setAppVisibility(value);
  };

  return (
    <div
      className={`view-container ${theme} ${appVisibility ? ACTIVE : HIDDEN}`}
      onAnimationEnd={appVisibility ? undefined : handleAnimationEnd}
    >
      {
        componentName === CREATE ? (
          <AddApplication handleSetVisibility={handleSetVisibility} />
        ) : componentName === VIEW ? (
          <ViewApplication handleSetVisibility={handleSetVisibility} />
        ) : componentName === SETTINGS ? (
          <Settings handleSetVisibility={handleSetVisibility} />
        ) : null // Return null if componentName doesn't match any of the conditions
      }
    </div>
  );
};

export default View;
