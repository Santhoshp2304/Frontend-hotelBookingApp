import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function BookingPage() {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState({});
  const [img, setImg] = useState("");
  const [totaldays, setTotaldays] = useState(null);
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const onToken = async (token) => {
    console.log(token);
    const bookingDetails = {
      room: room.name,
      roomId: roomid,
      userId,
      fromdate: moment(fromdate).format("YYYY-MM-DD"),
      todate: moment(todate).format("YYYY-MM-DD"),
      totalamount,
      totaldays,
      token,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/apiBooking/book`,
        bookingDetails
      );
      // message.success(response.data);
      console.log(response.data);
      Swal.fire(
        "Congrats!",
        "Your room was booked successfully",
        "success"
      ).then((result) => {
        window.location.href = `/bookinghistory`;
      });
    } catch (error) {
      console.log(error.message);
      // message.error(error);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  const fetchRoom = async () => {
    const response = await axios.get(
      `http://localhost:3000/apiRoom/getRoom/${roomid}`
    );
    setRoom(response.data);
    console.log(response.data);
    setImg(response.data.images[0]);
  };

  useEffect(() => {
    fetchRoom();
    const fdate = moment(fromdate, "YYYY-MM-DD");
    const tdate = moment(todate, "YYYY-MM-DD");
    console.log(fdate);
    setTotaldays(moment.duration(tdate.diff(fdate)).asDays() + 1);

    console.log(totaldays);
    console.log(room.rentperday);
  }, []);
  const totalamount = totaldays * room.rentperday;

  return (
    <div>
      <Container className="bs ">
        <div className="row m-3 p-3">
          <div className="col-sm-6">
            <h1>{room.name}</h1>

            <img className="img-fluid smallimg mb-3" src={img} />
          </div>
          <div className="col-sm-6 ">
            <h4>Booking Details</h4>
            <hr />
            <p>Name : {user}</p>
            <p>From Date : {fromdate}</p>
            <p>To Date : {todate}</p>
            <p>
              <b>Max Count : {room.maxcount}</b>
            </p>
            <h4>Amount</h4>
            <hr />
            <p>Total Days : {totaldays}</p>
            <p>
              Rent Per Day :<CurrencyRupeeIcon /> {room.rentperday}
            </p>
            <p>
              <b>
                Total Amount :<CurrencyRupeeIcon /> {totalamount}
              </b>
            </p>

            <StripeCheckout
              amount={totalamount * 100}
              token={onToken}
              currency="INR"
              stripeKey="pk_test_51PnNBFP0UQ2xoJVbXAHJIzM6qyC8UavbPYymPlx0tYngZllhUO0FLF52vlMVYvlYkT2VBfOe1WB3ZV4ailAWKSZh004oiMAZkY"
            >
              <button className="mr-auto btn btn-dark">Pay Now</button>
            </StripeCheckout>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default BookingPage;
