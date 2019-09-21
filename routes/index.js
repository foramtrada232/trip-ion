const express = require("express");

const router = express.Router();

const UserRoutes = require("./user");
const AdminRoutes = require('./admin');
const PassportRoutes = require("./passport");
const VisaRoutes = require("./visa");
const TicketRoutes = require("./ticket");
const VoucherRoutes = require("./voucher");
const DestinationRoutes = require("./destinationFinder");
const AirTicketPreferencesRoutes = require("./airTicketPreferences");
const AccommodationRoutes = require("./accommodation");
const TourRoutes = require("./tour");
const TransferRoutes = require("./transfer");

// middleware to use for all requests
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Expose-Headers", "X-My-Custom-Header, X-Another-Custom-Header");
	req.isApi = true;
	next(); // make sure we go to the next routes and don't stop here
});

module.exports = function (app) {
	router.use("/admin",AdminRoutes);
	router.use("/passport",PassportRoutes);
	router.use("/visa",VisaRoutes);
	router.use("/ticket",TicketRoutes);
	router.use("/voucher",VoucherRoutes);
	router.use("/destination",DestinationRoutes);
	router.use("/airTicketPreferences",AirTicketPreferencesRoutes);
	router.use("/accommodation",AccommodationRoutes);
	router.use("/tour",TourRoutes);
	router.use("/transfer",TransferRoutes);
	router.use(UserRoutes);
	app.use("/api", router);
};
