import "../styles/View.css";
import AddApplication from "./AddApplication";

const View = ({ appVisibility, handleVisibility, setAppVisibility }) => {
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
      {<AddApplication handleSetVisibility={handleSetVisibility} />}
    </div>
  );
};

export default View;
