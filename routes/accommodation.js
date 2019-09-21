const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');

// Controllers
const AccommodationController = require("../controller/accommodation.controller");

// Validations
const authValidate = require('../middleware/authValidate');
const AccommodationValidation = require("../validations/AccommodationValidations");


router.post("/add-accommodation",authValidate.validateToken,AccommodationValidation.addAccommodation,AccommodationController.addAccommodation);


module.exports = router;
