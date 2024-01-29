const router = require("express").Router();
const { Router } = require("express");
const connection = require("../../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const upload = require("../../middleware/uploadingImahe");
const admin = require("../../middleware/admin");
const cloudinary = require("cloudinary");
//====== create function that create trip =====//
// delclare environmet
cloudinary.config({
    cloud_name: 'dfdjpb4g9',
    api_key: '746284329117832',
    api_secret: 'I8linxEBicUJ846tHc9VmwNpiyY'
  });



router.put("/:id",body("master_image"),body("public_id"),body("name"),
    body("description"),
    body("date"),
    body("time"),
    body("salary"),
    async (req, res) => {
            //=== validation of request 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            else
            {
                // check if trip exist or not
                const query = util.promisify(connection.query).bind(connection);
                const trip = await query("select * from trip where id = ?" ,req.params.id);
                if(!trip[0])
                {
                    res.status(404).json("the id of trip not exist....")
                }
                else
                {   
                    //delete picture file
                    const pub_id = trip[0].public_id;
                    if(req.body.public_id)
                    {
                    await cloudinary.uploader.destroy(pub_id);
                    }
                    // prepare the object to insert
                    const trip_obj = {
                        name: req.body.name,
                        description: req.body.description,
                        date:req.body.date,
                        time:req.body.time,
                        salary:req.body.salary,
                        master_image:req.body.master_image,
                        public_id : req.body.public_id

                    }
                    await query("update trip set ? where id = ?",[trip_obj,req.params.id]);
                    res.status(200).json(req.body);
                }

            }
        })




module.exports = router;
