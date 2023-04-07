import axios from "axios";
import Login from "./components/Login";

function App() {
  axios.get("/api/welcome").then((res) => {
    console.log(res);
  });

  return (
    <>
      <Login />
    </>
  );
}

export default App;
