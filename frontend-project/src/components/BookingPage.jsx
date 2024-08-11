import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { message } from "antd";

function BookingPage() {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState({});
  const [img, setImg] = useState("");
  const [totaldays, setTotaldays] = useState(null);
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");

  const bookRoom = async () => {
    const bookingDetails = {
      room: room.name,
      roomId: roomid,
      userId,
      fromdate :moment(fromdate, "YYYY-MM-DD"),
      todate :moment(todate, "YYYY-MM-DD"),
      totalamount,
      totaldays,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/apiBooking/book`,
        bookingDetails
      );
      message.success(response.data)
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
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
            <Button variant="dark" className="mr-auto" onClick={bookRoom}>
              Pay Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default BookingPage;
