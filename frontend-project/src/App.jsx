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
import BookingHistory from "./components/BookingHistory";
import AllBookings from "./components/AllBookings";
import AllUsers from "./components/AllUsers";
import { useState } from "react";

function App() {
  const [isAuthenticated] = useState(!!localStorage.getItem("token"));
  console.log(isAuthenticated);
  return (
    <div>
      <AuthProdiver>
        <BrowserRouter>
          <Navbars />
          <Routes>
            {!isAuthenticated && (
              <>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/" Component={Landingpage} />
                <Route path ="*" Component ={Landingpage}/>
              </>
            )}

            {isAuthenticated && (
              <>
                <Route path="/home"  exact element={<Home />} />
                <Route path="/addroom" Component={AddRoom} />
                <Route
                  path="/bookingpage/:roomid/:fromdate/:todate"
                  Component={BookingPage}
                />
                <Route path="/bookinghistory" Component={BookingHistory} />
                <Route path="/allbookings" Component={AllBookings} />
                <Route path="/allusers" Component={AllUsers} />
                <Route path="*" exact element={Home} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AuthProdiver>
    </div>
  );
}

export default App;
