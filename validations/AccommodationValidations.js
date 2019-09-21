module.exports = {

	/** login validation */
	addAccommodation(req, res, next) {
        req.checkBody("destination", "Destination is required").trim().notEmpty();
        req.checkBody("checkIn", "Check In is required").trim().notEmpty();
        req.checkBody("checkOut", "Check Out is required").trim().notEmpty();
        req.checkBody("dateAndDurationStatus", "Status is required").trim().notEmpty();
        // req.checkBody("noOfpassengers", "No Of Passengers is required").trim().notEmpty();
        req.checkBody("roomCategory", "Room Category Preference is required").trim().notEmpty();
        req.checkBody("meal", "Meal Plan is required").trim().notEmpty();
        req.checkBody("culinary", "Culinary Preferences is required").trim().notEmpty();
        req.checkBody("accommodationType", "Accommodation Type is required").trim().notEmpty();
        req.checkBody("specialRequierment", "Special Requierment is required").trim().notEmpty();
        req.checkBody("methodOfCommunication", "Method Of Communication is required").trim().notEmpty();
        req.checkBody("budgetPreference", "Budget Preference is required").trim().notEmpty();
        req.checkBody("budgetAmount", "Budget Amount is required").trim().notEmpty();
        req.checkBody("modeOfPayment", "Mode Of Payment is required").trim().notEmpty();
        

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
