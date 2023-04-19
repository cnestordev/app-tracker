import "../styles/View.css";
import { ACTIVE, CREATE, HIDDEN } from "../utils/constants";
import AddApplication from "./AddApplication";
import ViewApplication from "./ViewApplication";

const View = ({
  appVisibility,
  handleVisibility,
  setAppVisibility,
  componentName,
}) => {
  const handleAnimationEnd = () => {
    handleVisibility(false);
  };

  const handleSetVisibility = (value) => {
    setAppVisibility(value);
  };

  return (
    <div
      className={`view-container ${appVisibility ? ACTIVE : HIDDEN}`}
      onAnimationEnd={appVisibility ? undefined : handleAnimationEnd}
    >
      {componentName.includes(CREATE) ? (
        <AddApplication handleSetVisibility={handleSetVisibility} />
      ) : (
        <ViewApplication handleSetVisibility={handleSetVisibility} />
      )}
    </div>
  );
};

export default View;
