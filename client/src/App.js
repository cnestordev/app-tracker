import { useEffect, useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/features/userSlice";
import { fetchUser } from "./utils/auth";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [dispatch]);

  if (isLoading) {
    return;
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<PrivateRoutes user={user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
