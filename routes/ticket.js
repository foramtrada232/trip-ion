const express = require("express");
const router = express.Router();
const decryptData = require('../middleware/decryptData');
const withAuth = require('../middleware/withAuth');
const fileUpload = require('../middleware/fileUpload');

// Controllers
const TicketController = require("../controller/ticket.controller");

// Validations
const TicketValidation = require("../validations/TicketValidations");

router.post("/add-ticket",fileUpload.ticketUpload('path'),TicketValidation.addTicket, TicketController.addTicket);
router.get("/get-ticket-by-userId/:userId",TicketController.getTicketByUserId);
router.get("/get-ticket-by-tripId/:tripId",TicketController.getTicketByTripId);

module.exports = router;
