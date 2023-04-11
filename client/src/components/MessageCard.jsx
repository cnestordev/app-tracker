import React, { useEffect } from "react";
import "../styles/MessageCard.css";

import { AlertCircle } from "react-feather";

import { useDispatch } from "react-redux";
import { resetMessage } from "../redux/features/messageSlice";

const MessageCard = ({ message, type, isDisplayed }) => {
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

  return (
    <>
      {isDisplayed && (
        <div className={`message-container show light ${type}`}>
          <div className="message-header">
            <AlertCircle />
          </div>
          <div className="message-body">
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageCard;
