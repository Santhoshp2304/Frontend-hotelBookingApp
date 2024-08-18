import React from "react";
import { Button, Card, Carousel, Container, Modal } from "react-bootstrap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Rating } from "@mui/material";


function Roomcard({ room, fromdate, todate, reviews }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [reviewShow, setReviewShow] = useState(false);

  const handleReviewClose = () => setReviewShow(false);
  const handleReviewShow = () => setReviewShow(true);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const user = localStorage.getItem("user");

  const postReview = async () => {
    console.log(review);
    console.log(rating);
    const newReview = {
      username: user,
      roomId: room._id,
      review: review,
      rating: rating,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/apiReview/postReview",
        newReview
      );
      message.success("Review posted successfully");
    } catch (error) {
      message.error("Please provide review with rating to post review");
    }
  };

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
              <Button
                className="ms-3"
                variant="dark"
                onClick={handleReviewShow}
              >
                View Reviews
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
            <h4>{room.description}</h4>
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
      <Modal show={reviewShow} onHide={handleReviewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews & Ratings</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "70vh" }}>
          {reviews.length?(reviews.map((review) => (
            <Card className="w-75 mt-3">
              <Card.Header><AccountCircleIcon/>{review.username}</Card.Header>
              <Card.Body>
                <h4>{review.review}</h4>
                <h4><Rating name="read-only" value={review.rating} readOnly /></h4>
              </Card.Body>
            </Card>
          ))):(<h4 className="text-center">No reviews</h4>)}
        </Modal.Body>
        <hr />
        <Container>
          <form
            style={{
              marginBottom: "7px",
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-around",
            }}
            onSubmit={postReview}
          >
            <input
              placeholder="Post your review"
              onChange={(e) => setReview(e.target.value)}
              required
            />
          
            <select
             id="options"
             name ="options"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value={''} disabled selected>Give your ratings</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className="btn btn-dark" type="submit">
              Post
            </button>
          </form>
        </Container>
      </Modal>
    </div>
  );
}

export default Roomcard;
