import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/apiUser/getAllUsers");
      setUsers(response.data);
      console.log(users)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <Container className="mt-5 p-5 bs">
      {users.length > 0 ? (
        users.map((user) => (
          <Card className="mt-3 p-2 w-75">
            <h4><b>Username :</b> {user.name}</h4>
            <h4><b>Email :</b> {user.email}</h4>
            <h4><b>Role :</b> {user.role}</h4>
          </Card>
        ))
      ) : (
        <h4 className="text-center">No Users</h4>
      )}
    </Container>
  );
}

export default AllUsers;
