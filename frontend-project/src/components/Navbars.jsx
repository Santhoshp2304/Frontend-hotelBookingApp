import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext, AuthProdiver } from "../context/AuthContext";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

function Navbars() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  console.log(user, role);

  const handleLogout = () => {
    logout();
    message.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <AuthProdiver>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <i>HotelBooking.com</i>
          </Navbar.Brand>
          <Nav className="me-right">
            {!user && (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            {user && role === "admin" && (
              <>
                <Nav.Link href="/addRoom/:userId">Add Room</Nav.Link>
                <Nav.Link href="/allbookings">All Bookings</Nav.Link>
                <Nav.Link onClick={handleLogout}>{user} - Logout</Nav.Link>{" "}
              </>
            )}
            {user && role === "user" && (
              <>
                <Nav.Link href="/bookinghistory">My Bookings</Nav.Link>
                <Nav.Link onClick={handleLogout}>{user} - Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </AuthProdiver>
  );
}

export default Navbars;
