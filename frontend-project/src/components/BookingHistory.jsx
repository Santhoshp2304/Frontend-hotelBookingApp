import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Swal from "sweetalert2";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

function BookingHistory() {
  const [userBookings, setUserBookings] = useState([]);
  const navigate = useNavigate();
  const fetchBookings = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `https://backend-hotelbookingapp-2.onrender.com/apiBooking/getBookings/${userId}`
    );
    setUserBookings(response.data);
    // console.log(response.data);
  };
  const cancelBooking = async (bookingId, roomId) => {
    try {
      const response = await axios.post(
        "https://backend-hotelbookingapp-2.onrender.com/apiBooking/cancelBooking",
        { bookingId, roomId }
      );
      Swal.fire("Congrats!", response.data, "success").then((result) => {
        navigate("/home");
      });
    } catch (error) {
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <Container className="mt-5 p-5">
        {userBookings.length > 0 ? (
          userBookings.map((booking) => (
            <Card className="mt-3 w-75">
              <Card.Body>
                <Card.Title className="mb-3">{booking.room}</Card.Title>
                <Card.Subtitle className="mb-2">
                  Booking Id : {booking._id}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  Check-In : {booking.fromdate}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  Check-Out : {booking.todate}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  Amount : <CurrencyRupeeIcon />
                  {booking.totalamount}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  Status :{" "}
                  {booking.status != "cancelled" ? (
                    <Tag color="green">Confirmed</Tag>
                  ) : (
                    <Tag color="red">Cancelled</Tag>
                  )}
                </Card.Subtitle>
                {booking.status != "cancelled" && (
                  <button
                    className="btn btn-dark"
                    style={{ float: "right" }}
                    onClick={() => cancelBooking(booking._id, booking.roomId)}
                  >
                    Cancel Booking
                  </button>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <h2 className="text-center mt-5">Sorry you have no bookings!</h2>
        )}
      </Container>
    </div>
  );
}

export default BookingHistory;
