import Login from "./components/Login";
import ErrorCard from "./components/ErrorCard";
import { login } from "./redux/features/userSlice";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function App() {
  console.log("%c app component rendered", "color: red;");
  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);

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
      {message.isDisplayed && (
        <ErrorCard
          type={message.type}
          message={message.message}
          isDisplayed={message.isDisplayed}
        />
      )}
      <Login />
    </>
  );
}

export default App;
