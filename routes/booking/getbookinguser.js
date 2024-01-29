const router = require("express").Router();
const { Router } = require("express");
const connection = require("../../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const admin = require("../../middleware/admin");


router.get("/",admin,async(req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    const bookingobg = await query ("select * from booking");
    if(bookingobg)
    {
        res.status(200).json(bookingobg);
    }
    else
    {
        res.status(202).json("no one book")
    }
}
catch(err)
{
    res.status(400).json(err)
}
})




module.exports = router ;
