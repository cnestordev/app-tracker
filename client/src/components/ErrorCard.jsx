import React, { useEffect } from "react";
import "../styles/ErrorCard.css";

import { AlertCircle } from "react-feather";

import { useDispatch } from "react-redux";
import { resetMessage } from "../redux/features/messageSlice";

const ErrorCard = ({ message, type, isDisplayed }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDisplayed) {
      const timerId = setTimeout(() => {
        dispatch(resetMessage());
      }, 3000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [dispatch, isDisplayed]);

  if (!isDisplayed) {
    return null;
  }

  return (
    <div className={`error-container show light ${type}`}>
      <div className="error-header">
        <AlertCircle />
      </div>
      <div className="error-body">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorCard;
