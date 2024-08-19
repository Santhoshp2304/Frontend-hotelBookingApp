import "./App.css";
import Navbars from "./components/Navbars";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddRoom from "./components/AddRoom";
import BookingPage from "./components/BookingPage";
import { AuthContext, AuthProdiver } from "./context/AuthContext";
import Landingpage from "./components/Landingpage";
import BookingHistory from "./components/BookingHistory";
import AllBookings from "./components/AllBookings";
import AllUsers from "./components/AllUsers";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div>
      <AuthProdiver>
        <BrowserRouter>
          <Navbars />
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/" Component={Landingpage} />
                <Route path="*" exact element={<Navigate to={"/"} />} />
              </>
            ) : (
              <>
                <Route path="/home" Component={Home} />
                <Route path="/addroom" Component={AddRoom} />
                <Route
                  path="/bookingpage/:roomid/:fromdate/:todate"
                  Component={BookingPage}
                />
                <Route path="/bookinghistory" Component={BookingHistory} />
                <Route path="/allbookings" Component={AllBookings} />
                <Route path="/allusers" Component={AllUsers} />
                <Route path="*" exact element={<Navigate to={"/home"} />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AuthProdiver>
    </div>
  );
}

export default App;
