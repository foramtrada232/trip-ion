const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');

// Controllers
const AirTicketPreferencesController = require("../controller/airTicketPreferences.controller");

// Validations
const authValidate = require('../middleware/authValidate');
const AirTicketValidation = require("../validations/AirTicketPreferencesValidations");


router.post("/add-ticket-preferences",authValidate.validateToken,AirTicketValidation.addTicketPreferences,AirTicketPreferencesController.addTicketPreferences);


module.exports = router;
