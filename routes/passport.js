const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');
const fileUpload = require('../middleware/fileUpload');

// Controllers
const PassportController = require("../controller/passport.controller");

// Validations
const PassportValidation = require("../validations/PassportValidations");

router.post("/add-passport",fileUpload.passportUpload('files'),PassportValidation.addPassport, PassportController.addPassport);

module.exports = router;
