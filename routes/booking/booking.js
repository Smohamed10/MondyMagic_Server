const router = require("express").Router();
const { Router } = require("express");
const connection = require("../../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const authorized = require("../../middleware/authorized");

//====== booking function =====//
router.post("/:id", body("trip_id"), async (req, res) => {
  try {
    // Check if a booking record already exists for the user and trip
    const queryBooking = util.promisify(connection.query).bind(connection);
    const bookingExists = await queryBooking("SELECT * FROM booking WHERE user_id = ? AND trip_id = ?", [req.params.id, req.body.trip_id]);

    if (bookingExists.length > 0) {
      return res.status(400).json("You already booked this trip");
    }

    // Check if the trip ID exists
    const queryTrip = util.promisify(connection.query).bind(connection);
    const trip = await queryTrip("SELECT * FROM trip WHERE id = ?", req.body.trip_id);

    if (!trip[0]) {
      return res.status(404).json("Please enter an existing trip ID");
    }

    // Get user data from the database
    const queryUser = util.promisify(connection.query).bind(connection);
    const user = await queryUser("SELECT * FROM user WHERE id = ?", req.params.id);

    if (!user[0]) {
      return res.status(404).json("User not found");
    }

    // Prepare booking object
    const tripName = trip[0].name;
    const tripDate = trip[0].date;

    const tripTime = trip[0].time;

    const userName = user[0].name;
    const userPhone = user[0].phone;

    const bookingObj = {
      user_id: req.params.id,
      user_name: userName,
      phone: userPhone,
      trip_id: req.body.trip_id,
      trip_name: tripName,
      date: tripDate,
      time: tripTime

    };

    // Insert the booking object into the database
    const insertBooking = util.promisify(connection.query).bind(connection);
    await insertBooking("INSERT INTO booking SET ?", bookingObj);

    res.status(200).json(bookingObj);
  } catch (error) {
    console.error("Error while processing booking:", error);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
