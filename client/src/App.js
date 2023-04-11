import { useEffect, useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import MessageCard from "./components/MessageCard";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/features/userSlice";
import { fetchUser } from "./utils/auth";

function App() {
  console.log("app mounted");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const showMessage = useSelector((state) => state.message.isDisplayed);
  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUser();
        setUser(res);
        dispatch(login(res));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return;
  } else {
    return (
      <>
        {showMessage && (
          <MessageCard
            isDisplayed={showMessage}
            type={message.type}
            message={message.message}
          />
        )}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/" element={<PrivateRoutes user={user} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
