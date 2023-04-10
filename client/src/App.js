import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import ErrorCard from "./components/ErrorCard";
import { login } from "./redux/features/userSlice";
import axios from "axios";

function App() {
  console.log("%c app component rendered", "color: red;");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/getuser");
        const user = res.data.user;
        console.log(user);
        dispatch(login(user));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);

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
