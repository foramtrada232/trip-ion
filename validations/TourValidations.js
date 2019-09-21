module.exports = {

	/** login validation */
	addTourData(req, res, next) {
        req.checkBody("destination", "Destination is required").trim().notEmpty();
        req.checkBody("tourBasis", "Tour Basis is required").trim().notEmpty();
        req.checkBody("itineraryPace", "Itinerary Pace is required").trim().notEmpty();
        req.checkBody("specialRequest", "Special Request is required").trim().notEmpty();

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
