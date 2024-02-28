const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const connection = require("../../db/dbConnection");
const util = require("util");

router.post("/", [
  body("master_image").notEmpty().withMessage('Master image is required'), // Validate that master_image is not empty
  body("public_id").notEmpty().withMessage('Public ID is required'), // Validate that public_id is not empty
  body("name").notEmpty().withMessage('Name is required'),
  body("description").notEmpty().withMessage('Description is required'),
  body("date").notEmpty().withMessage('Date is required'),
  body("time").notEmpty().withMessage('Time is required'),
  body("salary").notEmpty().withMessage('Salary is required'),
  body("category").notEmpty().withMessage('Salary is required'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Split comma-separated strings into arrays
    const masterImageArray = req.body.master_image.split(',');
    const publicIdArray = req.body.public_id.split(',');

   // Prepare the trip object
   const tripObj = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    salary: req.body.salary,
    category: req.body.category
  };

  // Insert the trip object into the database
  const insertTripQuery = util.promisify(connection.query).bind(connection);
  const tripInsertResult = await insertTripQuery("INSERT INTO trip SET ?", tripObj);

  // Get the ID of the inserted trip
  const tripId = tripInsertResult.insertId;

  // Prepare and insert image objects
  const imageInsertPromises = masterImageArray.map((imageUrl, index) => {
    const imageObj = {
      tripid: tripId,
      imgurl: imageUrl,
      publicid: publicIdArray[index] // Map corresponding public_id
    };
    return insertTripQuery("INSERT INTO triimg SET ?", imageObj);
  });

  // Execute all image insert queries
  await Promise.all(imageInsertPromises);

  res.status(200).json(req.body);
} catch (err) {
  console.error(err);
  res.status(500).send("Server Error");
}
});

module.exports=router;