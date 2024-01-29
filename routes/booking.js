const router = require("express").Router();
const { Router } = require("express");
const connection = require("../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const authorized = require("../middleware/authorized");

//====== booking function =====//
router.post("/:id",authorized,body("trip_id"),async(req,res)=>{
    // create object of booking 
    const bookObj = {
        user_id : req.params.id,
        trip_id: req.body.trip_id
    }
    // check if trip id exist 
    const query = util.promisify(connection.query).bind(connection);
    const trip = await query("select * from trip where id = ?",req.body.trip_id);
    if(trip[0]==null)
    {
        res.status(404).json("sorry trip not found")
    }
    else
    {
    // insert object in database 
    await query ("insert into booking set ? ", bookObj);
    res.status(200).json(req.body);
    }
})

module.exports = router ;