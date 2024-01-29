const router = require("express").Router();
const connection = require("../../db/dbConnection");
const util = require("util");

router.get("/", async (req, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    const trips = await query("SELECT * FROM trip");

    if (trips.length === 0) {
      return res.status(404).json("There Is No Images To Show");
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
