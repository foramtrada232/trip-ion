const express = require("express");
const router = express.Router();
const withAuth = require('../middleware/withAuth');


// Controllers
const DestinationController = require("../controller/destinationFinder.controller");

router.post("/add-destination", DestinationController.addDestination);


module.exports = router;
