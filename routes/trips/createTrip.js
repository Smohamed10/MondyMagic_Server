const router = require("express").Router();
const { Router } = require("express");
const connection = require("../../db/dbConnection");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const upload = require("../../middleware/uploadingImahe");
const admin = require("../../middleware/admin");

//====== create function that create trip =====//

router.post("/",body("master_image"),body("public_id"),body("name"),
    body("description"),
    body("date"),
    body("time"),
    body("salary"),
    async (req, res) => {
        try {
            //=== validation of request 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            else
            {
                // prepare the object  
                const trip_obj = {
                    name: req.body.name,
                    description: req.body.description,
                    date:req.body.date,
                    time:req.body.time,
                    salary:req.body.salary,
                    master_image:req.body.master_image,
                    public_id:req.body.public_id
                }
                const query = util.promisify(connection.query).bind(connection);
                await query("insert into trip set ? ", trip_obj);
                res.status(200).json(req.body)
            }

        }
        catch (err) {
            res.send(err)
        }
    }
)




module.exports = router;