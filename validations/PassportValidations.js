module.exports = {

	/** validation for Add Passport */
	addPassport(req, res, next) {
		req.checkBody("nameAccordingToPassport", "Name is required").trim().notEmpty();
		req.checkBody("passportNumber", "Passport Number is required").trim().notEmpty();
		req.checkBody("expiryDate", "Expiry date is required").trim().notEmpty();
		// req.checkBody(files,"Passport file is required").trim().notEmpty();

		req.asyncValidationErrors()
			.then(() => {
				next();
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

};
