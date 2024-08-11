import "./App.css";
import Navbars from "./components/Navbars";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddRoom from "./components/AddRoom";
import BookingPage from "./components/BookingPage";
import { AuthProdiver } from "./context/AuthContext";
import Landingpage from "./components/Landingpage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated);
  return (
    <div>
      <AuthProdiver>
        <BrowserRouter>
          <Navbars />
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/" Component={Landingpage} />

            <Route path="/home" exact element={<Home />} />
            <Route path="/addroom" Component={AddRoom} />
            <Route
              path="/bookingpage/:roomid/:fromdate/:todate"
              Component={BookingPage}
            />

            <Route path="*" element={<Navigate to={"/login"}></Navigate>} />
          </Routes>
        </BrowserRouter>
      </AuthProdiver>
    </div>
  );
}

export default App;
