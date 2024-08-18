import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form } from "react-bootstrap";
import Roomcard from "./Roomcard";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
// const moment =require('moment')
function Home() {
  const [rooms, setRooms] = useState([]);
  const { RangePicker } = DatePicker;
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [roomReviews, setRoomReviews] = useState([]);


  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };

  const filterByDate = (dates) => {
    const [startDate, endDate] = dates;

    console.log(
      moment("2024-08-16").isBetween(
        moment(startDate.$d).format("YYYY-MM-DD"),
        moment(endDate.$d).format("YYYY-MM-DD"),
        null,
        "[]"
      )
    );
    setFromdate(moment(startDate.$d).format("YYYY-MM-DD"));
    setTodate(moment(endDate.$d).format("YYYY-MM-DD"));
    let tempRoom = [];

    duplicateRooms.filter((room) => {
      let isBooked = room.currentbookings.some(
        (booking) =>
          moment(moment(startDate.$d).format("YYYY-MM-DD")).isSameOrBefore(
            moment(booking.todate)
          ) &&
          moment(moment(endDate.$d).format("YYYY-MM-DD")).isSameOrAfter(
            moment(booking.fromdate)
          )
      );

      console.log(isBooked);
      if (!isBooked) {
        tempRoom.push(room);
      }
    });
    console.log(tempRoom);
    setRooms(tempRoom);
  };

  const filterBySearch = async () => {
    const tempRoom = duplicateRooms.filter(
      (room) =>
        room.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        room.location.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRoom);
  };
  async function fetchRooms() {
    try {
      const response = await axios.get(
        "http://localhost:3000/apiRoom/getRooms"
      );
      setRooms(response.data);
      setDuplicateRooms(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const filterByAmount = (e) => {
    if (e == "all") {
      const temp = duplicateRooms;
      setRooms(temp);
    }
    if (e == "Under5000") {
      const temp = duplicateRooms.filter((room) => room.rentperday <= 5000);
      setRooms(temp);
    }
    if (e == "Above5000") {
      const temp = duplicateRooms.filter((room) => room.rentperday >= 5000);
      setRooms(temp);
    }
  };
  const getReviews = async () => {
    try {
      const reviewResponse = await axios.get(
        `http://localhost:3000/apiReview/getReviews`
      );

      setRoomReviews(reviewResponse.data);
      console.log(reviewResponse.data);
    } catch (error) {
      console.log("error in fetching reviews");
    }
  };

  useEffect(() => {
    fetchRooms();
    getReviews();
  }, []);
  return (
    <div>
      <Container className="mb-5">
        <div className="row sticky-top" style={{ paddingTop: 100 }}>
          <div className="col-md-3">
            <RangePicker
              className="range"
              format={"YYYY-MM-DD"}
              onChange={filterByDate}
              disabledDate={disabledDate}
            />
          </div>
          <div className="col-md-6">
            <input
              className="w-100"
              placeholder=" Search your room or location"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={filterBySearch}
            />
          </div>
          <div className="col-md-3">
            <select
              className="w-100 d-flex d-grid"
              onChange={(e) => filterByAmount(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Under5000">Under Rs.5000</option>
              <option value="Above5000">Above Rs.5000</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          {rooms.length > 0 ? (
            rooms?.map((room) => (
              <>
                <Roomcard
                  key={room?._id}
                  room={room}
                  fromdate={fromdate}
                  todate={todate}
                  reviews ={roomReviews.filter(r => r.roomId == room._id)}
                />
              </>
            ))
          ) : (
            <h2 className="text-center mt-5">Sorry room not found!</h2>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
