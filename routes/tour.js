const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');

// Controllers
const TourController = require("../controller/tour.controller");

// Validations
const authValidate = require('../middleware/authValidate');
const TourValidation = require("../validations/TourValidations");


router.post("/add-tour-data",authValidate.validateToken,TourValidation.addTourData,TourController.addTourData);


module.exports = router;
