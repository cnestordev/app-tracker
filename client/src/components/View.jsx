import "../styles/View.css";
import { CREATE } from "../utils/constants";
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
      className={`view-container ${appVisibility ? "active" : "hidden"}`}
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
