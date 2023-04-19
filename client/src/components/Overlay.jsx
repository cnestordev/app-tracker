import { Loader } from "react-feather";
import "../styles/Overlay.css";
import { HIDDEN } from "../utils/constants";

const Overlay = ({ isHidden }) => {
  const hiddenValue = isHidden ? "" : HIDDEN;
  return (
    <div className={`overlay-container light ${hiddenValue}`}>
      <Loader />
    </div>
  );
};

export default Overlay;
