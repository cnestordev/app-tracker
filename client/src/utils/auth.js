import axios from "axios";

export const handleLoginSubmit = (
  username,
  password,
  darkMode,
  isRegistering
) => {
  const endpoint = isRegistering ? "/auth/register" : "/auth/login";
  const newUser = { username, password, theme: { type: darkMode } };
  return axios.post(endpoint, newUser);
};
