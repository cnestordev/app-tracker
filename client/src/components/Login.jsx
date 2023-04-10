import { useState } from "react";
import "../styles/Login.css";

import { Eye, User } from "react-feather";
import {
  LOGIN_MSG_INFO,
  REGISTER_MSG_INFO,
  LOGIN_MSG_BTN,
  REGISTER_MSG_BTN,
  DANGER,
} from "../utils/constants";

import { handleLoginSubmit } from "../utils/auth";

import { useDispatch } from "react-redux";
import { login } from "../redux/features/userSlice";
import { setMessage } from "../redux/features/messageSlice";

const Login = (props) => {
  const dispatch = useDispatch();
  console.log("%c login component rendered", "color: yellow;");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  // const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await handleLoginSubmit(username, password, isRegistering);
      dispatch(login(res.data.newUserObj));
      // history.push('/dashboard');
    } catch (error) {
      const responseMessage = error.response.data.message;
      dispatch(setMessage({ message: responseMessage, type: DANGER }));
    }
  };

  return (
    <div className="login-container light">
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
