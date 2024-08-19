import "./App.css";
import Navbars from "./components/Navbars";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/Home";
import AddRoom from "./components/AddRoom";
import BookingPage from "./components/BookingPage";
import { AuthProdiver } from "./context/AuthContext";
import BookingHistory from "./components/BookingHistory";
import AllBookings from "./components/AllBookings";
import AllUsers from "./components/AllUsers";
import Landingpage from "./components/Landingpage";

function App() {

  return (
    
      <AuthProdiver>
        <BrowserRouter>
          <Navbars />
          <Routes>
            <Route path="/" Component={Landingpage}/>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/home" Component={Home} />
            <Route path="/addroom" Component={AddRoom} />
            <Route
              path="/bookingpage/:roomid/:fromdate/:todate"
              Component={BookingPage}
            />
            <Route path="/bookinghistory" Component={BookingHistory} />
            <Route path="/allbookings" Component={AllBookings} />
            <Route path="/allusers" Component={AllUsers} />
          </Routes>
        </BrowserRouter>
      </AuthProdiver>
    
  );
}

export default App;
