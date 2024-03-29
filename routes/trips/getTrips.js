const router = require("express").Router();
const connection = require("../../db/dbConnection");
const util = require("util");

router.get("/", async (req, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    let trips = "";

    if (req.query.category === "All") {
      // If category is "All", fetch all trips
      trips = await query("SELECT * FROM trip");
    } else {
      // Otherwise, fetch trips with the specified category
      trips = await query("SELECT * FROM trip WHERE category = ?", req.query.category);
    }

    if (trips.length === 0) {
      return res.status(404).json("There Is No Images To Show");
    }

    // Fetching images for each trip
    for (const trip of trips) {
      const imagesQuery = `SELECT imgurl FROM triimg WHERE tripid = ${trip.id}`;
      const imagesResult = await query(imagesQuery);
      // Extracting image URLs and storing them in an array
      const imageUrls = imagesResult.map((row) => row.imgurl);
      // Concatenating image URLs with the specified separator and adding to the trip object
      trip.master_image = imageUrls.join(", "); // Assuming you want them separated by comma and space
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
