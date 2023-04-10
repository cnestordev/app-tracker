import Login from "./components/Login";

import axios from "axios";

import { useDispatch } from "react-redux";
import { login } from "./redux/features/userSlice";

function App() {
  console.log("%c app component rendered", "color: red;");
  const dispatch = useDispatch();

  axios
    .get("/auth/getuser")
    .then((res) => {
      const user = res.data.user;
      console.log(user);
      dispatch(login(user));
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <Login />
    </>
  );
}

export default App;
