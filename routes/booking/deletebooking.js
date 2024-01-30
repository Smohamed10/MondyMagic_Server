const router = require("express").Router();
const { Router } = require("express");
const connection = require("../../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const upload = require("../../middleware/uploadingImahe");
const authorized = require("../../middleware/authorized");
const fs = require("fs");


router.delete("/:id",async(req,res)=>{
    const id = req.params.id ;
    //check if the id exist
    const query = util.promisify(connection.query).bind(connection);
    const trip = await query ("select * from booking where id = ?",id);
    if(trip[0]==null)
    {
        res.status(404).json("sorry the id of booking not exist")
    }
    else
    {      
        try {
          // Attempt to unlink (delete) the file
          await query ("delete from booking where id = ?",trip[0].id);
          res.status(200).json("booking record deleted")
        } catch (err) {
          res.json(err)
         } 

        }}
)

module.exports = router;
