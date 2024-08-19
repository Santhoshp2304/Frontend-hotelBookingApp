import "./App.css";
import Navbars from "./components/Navbars";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
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
        <Router>
          <Navbars />
          <Routes>
            <Route path="/" exact element={<Landingpage/>}/>
            <Route path="/login" exact element={<Login/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/home" exact element={<Home/>} />
            <Route path="/addroom" exact element={<AddRoom/>} />
            <Route
              path="/bookingpage/:roomid/:fromdate/:todate"
              exact element={<BookingPage/>}
            />
            <Route path="/bookinghistory" exact element={<BookingHistory/>} />
            <Route path="/allbookings" exact element={<AllBookings/>} />
            <Route path="/allusers" exact element={<AllUsers/>} />
          </Routes>
        </Router>
      </AuthProdiver>
    
  );
}

export default App;
