import React, { useContext } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { AuthContext, AuthProdiver } from "../context/AuthContext";
import { message } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Navbars() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  // console.log(user, role);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    message.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <AuthProdiver>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed-top  mb-5">
        <Container>
          <Navbar.Brand>
            <i>HotelBooking.com</i>
          </Navbar.Brand>
          <Nav className="me-right">
            {!user && (
              <>
                <Nav.Link>
                  <Link to="/register">Register</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </>
            )}
            {user && role === "admin" && (
              // <>
              //   <Nav.Link href="/addRoom">Add Room</Nav.Link>
              //   <Nav.Link href="/allbookings">All Bookings</Nav.Link>
              //   <Nav.Link onClick={handleLogout}><AccountCircleIcon/>{user} - Logout</Nav.Link>{" "}
              // </>
              <Dropdown className="btn btn-dark">
                <Dropdown.Toggle className="btn btn-dark">
                  <AccountCircleIcon />
                  {user} - {role}{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/allbookings"> All Bookings</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/addRoom">Add Room</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/allusers">All Users</Link>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {user && role === "user" && (
              // <>
              //   <Nav.Link href="/bookinghistory">My Bookings</Nav.Link>
              //   <Nav.Link onClick={handleLogout}><AccountCircleIcon/>{user} - Logout</Nav.Link>
              // </>
              <Dropdown className="btn btn-dark">
                <Dropdown.Toggle className="btn btn-dark">
                  <AccountCircleIcon />
                  {user} - {role}{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/bookinghistory">My Bookings</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </AuthProdiver>
  );
}

export default Navbars;
