import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const fetchAllBookings = async () => {
    try {
      const response = await axios.get(
        "https://backend-hotelbookingapp-2.onrender.com/apiBooking//getAllBookings"
      );
      setBookings(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllBookings();
  }, []);
  return (
    <div>
      <Container className="mt-5 p-5">
        {bookings.length > 0 ? (
          bookings.map((booking, i) => (
            <Card className="mt-3 w-75" key={i}>
              <Card.Body>
                <Card.Title className="mb-3">{booking.room}</Card.Title>
                <Card.Subtitle className="mb-2">
                  Booking Id : {booking._id}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  User Id : {booking.userId}
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
                  Status : {booking.status}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h2 className="text-center mt-5">
            Sorry, there was no bookings so far!
          </h2>
        )}
      </Container>
    </div>
  );
}

export default AllBookings;
