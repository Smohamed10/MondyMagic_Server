//================= init express app ===============
const express = require("express");
const app = express();


//=================Global middleware==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors());  // allow https requst,respons



//========== require modules ==========
const register = require("./routes/auth/register");
const login = require("./routes/auth/login");
const createTrip = require("./routes/trips/createTrip");
const getttip = require("./routes/trips/getTrips");
const updatetrip = require("./routes/trips/updatetrip");
const booking = require("./routes/booking/booking");
const deletetrip = require("./routes/trips/deletetrip");
const getuserbooking = require("./routes/booking/getbookinguser");
const deleteBookingT = require("./routes/booking/deletebooking");

//====== API ROUTES =============
// http://localhost:4040/
app.use("/register",register);
app.use("/login",login);
app.use("/createtrip",createTrip);
app.use("/gettrip",getttip);
app.use("/updatetrip",updatetrip);
app.use("/booking",booking);
app.use("/deletetrip",deletetrip);
app.use("/getusersbooking",getuserbooking);
app.use("/deletebookingT",deleteBookingT);




//======== run the app ============//
app.listen(4040,"localhost",()=>{

    console.log("SERVER IS RUNNING....");
})
