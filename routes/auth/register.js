const router = require("express").Router();
const connection = require("../../db/dbConnection");
const { body , validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//======== registration ==========// 
router.post("/",body("name").isString().withMessage("please enter valid name"),
                        body("email"),
                        body("password"),
                        body("phone").isNumeric().withMessage("please enter valid number")
                        ,async (req,res)=>{
    try
    {
       //=== validation of request 
     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
        return res.status(400).json({errors:errors.array()})
     }
     //==== check the email is exist or not ====//
     const query = util.promisify(connection.query).bind(connection); // transform query to promise to can use await/ async
     const emailexist = await query ("select * from user where email = ? ",[req.body.email])
     if(emailexist.length > 0)
     {
        res.status(400).json({msg:"this email is already exist .."})
     }
     else
     {
        //==== prepare the object 
        const userobj ={
         name : req.body.name,
         email : req.body.email,
         password : await bcrypt.hash(req.body.password,10),
         phone : req.body.phone,
         token : crypto.randomBytes(16).toString("hex")
        }
        // add the data in database 
        await query ("insert into user set ? ", userobj)
        res.status(500).json({
         msg : " the registration is success",
        })
     }
    }

    catch(err)
    {
        res.send(err)
    }
})






module.exports = router ; 