import { Loader } from "react-feather";
import "../styles/Overlay.css";

const Overlay = ({ isHidden }) => {
  const hiddenValue = isHidden ? "" : "hidden";
  return (
    <div className={`overlay-container light ${hiddenValue}`}>
      <Loader />
    </div>
  );
};

export default Overlay;
