import React, { useEffect } from "react";
import { Button, Card, Carousel, Modal } from "react-bootstrap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingPage from "./BookingPage";

function Roomcard({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card key={room._id} className="mt-4 px-3  bs col-md-12 ">
        <div key="img" className="row mb -3  py-3">
          <img
            className="col-md-4 justify-content-center smallimg"
            src={room.images[0]}
          />

          <div key="details" className="col-md-8 justify-content-center">
            <h2>{room.name}</h2>
            <h4>
              <LocationOnIcon />
              {room.location}
            </h4>
            <h4>{room.description}</h4>
            <h4>Max Count :{room.maxcount}</h4>
            <h4>
              Rent : <CurrencyRupeeIcon />
              {room.rentperday}
            </h4>
            <div>
              <Button className="ms-3" variant="dark" onClick={handleShow}>
                View Details
              </Button>
              {fromdate && todate && (
                <Link to={`/bookingpage/${room._id}/${fromdate}/${todate}`}>
                  <Button className="ms-3" variant="dark">
                    Book Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.images.map((url) => {
              return (
                <Carousel.Item>
                  <img className="bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <div>
            <h4>
              <LocationOnIcon />
              {room.location}
            </h4>
            <h4>
              <PhoneIcon />
              {room.phonenumber}
            </h4>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Roomcard;
