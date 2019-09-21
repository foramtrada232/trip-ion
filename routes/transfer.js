const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');

// Controllers
const TransferController = require("../controller/transfer.controller");

// Validations
const authValidate = require('../middleware/authValidate');
const TransferValidation = require("../validations/TransferValidations");


router.post("/add-transfer-data",authValidate.validateToken,TransferValidation.addTransferData,TransferController.addTransferData);


module.exports = router;
