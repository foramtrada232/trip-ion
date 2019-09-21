const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');
const fileUpload = require('../middleware/fileUpload');

// Controllers
const VisaController = require("../controller/visa.controller");

// Validations
const VisaValidation = require("../validations/VisaValidations");

router.post("/add-visa",fileUpload.visaUpload('files'),VisaValidation.addVisa, VisaController.addVisa);

module.exports = router;