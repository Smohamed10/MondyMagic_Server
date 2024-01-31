const router = require("express").Router();
const { Router } = require("express");
const connection = require("../../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const upload = require("../../middleware/uploadingImahe");
const authorized = require("../../middleware/authorized");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: 'dfdjpb4g9',
  api_key: '746284329117832',
  api_secret: 'I8linxEBicUJ846tHc9VmwNpiyY'
});


router.delete("/:id", async (req, res) => {

  const id = req.params.id;
  // check if the id exist
  const query = util.promisify(connection.query).bind(connection);
  const trip = await query("select * from trip where id = ?", id);
  if (trip[0] == null) {
    res.status(404).json("sorry the id of trip not exist")
  }
  const booking = await query ("select * from booking where trip_id = ?",id);
  if(booking[0])
  {
    res.status(404).json("you cant delete this field")
  }
  else {
     const tripimg = await query ("select * from triimg where tripid = ?",id)
     for (let i = 0; i < tripimg.length; i++) {
      const pubID = tripimg[i].publicid;
      const result = await cloudinary.uploader.destroy(pubID);
    }

      await query ("delete from trip where id = ? ",id)
      await query ("delete from triimg where tripid = ? ",id);
      res.status(200).json("the trip deleted");
    
  }
}






)

module.exports = router;