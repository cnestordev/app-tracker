import { useState } from "react";
import "../styles/Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    // Call your login API here
    if (false) {
      // history.push("/dashboard");
    } else {
      alert("Incorrect username or password");
    }
  }

  return (
    <div className="login-container light">
      <div className="login-header">
        <h2>Create an account</h2>
      </div>
      <div className="login-body">
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            <input
              className="input-field"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label className="input-label">
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
