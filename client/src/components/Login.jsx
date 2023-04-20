import { useEffect, useState } from "react";
import "../styles/Login.css";

import { Eye, User } from "react-feather";
import {
  LOGIN_MSG_INFO,
  REGISTER_MSG_INFO,
  LOGIN_MSG_BTN,
  REGISTER_MSG_BTN,
  DANGER,
} from "../utils/constants";

import { fetchUser, handleLoginSubmit } from "../utils/auth";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/userSlice";
import { setMessage } from "../redux/features/messageSlice";
import DarkModeToggle from "./DarkModeToggle";
import Overlay from "./Overlay";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkModeTheme = useSelector((state) => state.user.theme.type);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if user is logged in, navigate to dashboard
    const getUser = async () => {
      try {
        await fetchUser();
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        // console.log(error);
      }
    };
    getUser();
  }, [navigate, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await handleLoginSubmit(
        username,
        password,
        darkModeTheme,
        isRegistering
      );
      dispatch(login(res.data.populatedUser));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const responseMessage = error.response.data.message;
      dispatch(setMessage({ message: responseMessage, type: DANGER }));
    }
  };

  return (
    <div className={`login-container ${darkModeTheme}`}>
      <Overlay isHidden={isLoading} />
      <div className={`dark-mode-container ${darkModeTheme}`}>
        <DarkModeToggle component="login" />
        <span>{darkModeTheme} mode</span>
      </div>
      <div className="login-header">
        <h2>Create an account</h2>
      </div>
      <div className="login-body">
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            <User />
            <input
              className="input-field"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="username"
            />
          </label>
          <br />
          <label className="input-label password-field">
            <Eye />
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="false"
              placeholder="password"
            />
          </label>
          <br />
          <button className="submit-btn" type="submit">
            {isRegistering ? REGISTER_MSG_BTN : LOGIN_MSG_BTN}
          </button>
          <div
            onClick={() => setIsRegistering(!isRegistering)}
            className="info"
          >
            <span>{isRegistering ? REGISTER_MSG_INFO : LOGIN_MSG_INFO}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
