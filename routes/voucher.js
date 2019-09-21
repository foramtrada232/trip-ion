const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');
const fileUpload = require('../middleware/fileUpload');

// Controllers
const VoucherController = require("../controller/voucher.controller");

// Validations
const VoucherValidation = require("../validations/VoucherValidations");

router.post("/add-voucher",fileUpload.voucherUpload('path'), VoucherValidation.addVoucher, VoucherController.addVoucher);
router.get("/get-voucher-by-userId/:userId", VoucherController.getVoucherByUserId);
router.get("/get-voucher-by-tripId/:tripId", VoucherController.getVoucherByTripId);

module.exports = router;
