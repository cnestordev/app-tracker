import axios from "axios";

export const handleLoginSubmit = (username, password, event) => {
  event.preventDefault();
  const newUser = { username, password };
  axios.post("/auth/register", newUser);
  if (false) {
    // history.push("/dashboard");
  } else {
    alert("Incorrect username or password");
  }
};
