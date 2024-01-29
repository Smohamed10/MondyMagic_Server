const express = require("express");
const app = express();
const cors = require("cors");

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));

// CORS middleware with specific origin
app.use(cors({
  origin: 'https://mondy-magic-client.vercel.app', // Replace with your frontend's domain
  methods: ['GET', 'POST'], // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
}));

// Require modules
const register = require("./routes/auth/register");
const login = require("./routes/auth/login");
const createTrip = require("./routes/trips/createTrip");
const getttip = require("./routes/trips/getTrips");
const updatetrip = require("./routes/trips/updatetrip");
const booking = require("./routes/booking/booking");
const deletetrip = require("./routes/trips/deletetrip");
const getuserbooking = require("./routes/booking/getbookinguser");
const deleteBookingT = require("./routes/booking/deletebooking");

// API Routes
app.use("/register",register);
app.use("/login",login);
app.use("/createtrip",createTrip);
app.use("/gettrip",getttip);
app.use("/updatetrip",updatetrip);
app.use("/booking",booking);
app.use("/deletetrip",deletetrip);
app.use("/getusersbooking",getuserbooking);
app.use("/deletebookingT",deleteBookingT);

// Run the app
const port = 4040;
app.listen(port || process.env.port, () => {
    console.log(`SERVER IS RUNNING....${port}`);
});
