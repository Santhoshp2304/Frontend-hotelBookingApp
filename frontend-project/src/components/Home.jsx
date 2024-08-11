import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
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

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };

  const filterByDate = (dates) => {
    const [startDate, endDate] = dates;

    setFromdate(moment(startDate.$d).format("YYYY-MM-DD"));
    setTodate(moment(endDate.$d).format("YYYY-MM-DD"));
  let tempRoom =[];
    let availableRoom = rooms.map((room) => {
      
        let checkAvailability = room.currentbookings?.some(
          (range) =>
            moment(range.fromdate).isSame(
              moment(startDate.$d).format("YYYY-MM-DD")
            ) &&
            moment(range.todate).isSame(moment(endDate.$d).format("YYYY-MM-DD"))
        );

        if (!checkAvailability) {
          tempRoom.push(room);
        }
      
    });
    console.log(tempRoom);
    setRooms(tempRoom);
  };
  async function fetchRooms() {
    try {
      const response = await axios.get(
        "http://localhost:3000/apiRoom/getRooms"
      );
      setRooms(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <div>
      <Container className="mb-5">
        <div className="row bs mt-5  p-3">
          <div className="col-md-5">
            <RangePicker
              format={"YYYY-MM-DD"}
              onChange={filterByDate}
              disabledDate={disabledDate}
            />
          </div>
        </div>

        {rooms?.map((room) => (
          <Roomcard
            key={room?._id}
            room={room}
            fromdate={fromdate}
            todate={todate}
          />
        ))}
      </Container>
    </div>
  );
}

export default Home;
