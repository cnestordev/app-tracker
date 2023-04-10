import axios from "axios";

export const handleLoginSubmit = (username, password, isRegistering) => {
  const endpoint = isRegistering ? "/auth/register" : "/auth/login";
  const newUser = { username, password };
  return axios.post(endpoint, newUser);
};
