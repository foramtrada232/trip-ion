module.exports = {

	/** login validation */
	addTicketPreferences(req, res, next) {
		req.checkBody("departureDate", "Departure Date is required").trim().notEmpty();
        req.checkBody("arrivalDate", "Arrival Date is required").trim().notEmpty();
        req.checkBody("to", "To is required").trim().notEmpty();
        req.checkBody("from", "From is required").trim().notEmpty();
        req.checkBody("dateAndDurationStatus", "Status is required").trim().notEmpty();
        // req.checkBody("noOfpassengers", "No Of Passengers is required").trim().notEmpty();
        req.checkBody("journeyType", "Journey Type is required").trim().notEmpty();
        req.checkBody("flightTierPreference", "Flight Tier Preference is required").trim().notEmpty();
        req.checkBody("flightSeatPreference", "Flight Seat Preference is required").trim().notEmpty();
        req.checkBody("methodOfCommunication", "Method Of Communication is required").trim().notEmpty();
        req.checkBody("budgetPreference", "Budget Preference is required").trim().notEmpty();
        req.checkBody("modeOfPayment", "modeOfPayment is required").trim().notEmpty();

		req.asyncValidationErrors()
			.then(() => {
				next();
			})
			.catch(errors => res.status(500).json({
				success: false,
				errors: errors[0].msg,
			}));
	},
};
