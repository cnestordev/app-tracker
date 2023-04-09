import { useState } from "react";
import "../styles/Login.css";

import { Eye, User } from "react-feather";

import { handleLoginSubmit } from "../utils/auth";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  const handleSubmit = (event) => {
    handleLoginSubmit(username, password, event);
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
            />
          </label>
          <br />
          <button className="submit-btn" type="submit">
            Login
          </button>
          <div className="info">
            <span>Already registred? Login here.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
