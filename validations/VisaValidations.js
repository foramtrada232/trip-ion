module.exports = {

    
	/** validation for Add Visa */
	addVisa(req, res, next) {
		req.checkBody("nameAccordingToPassport", "Name is required").trim().notEmpty();
        req.checkBody("passportNumber", "Passport Number is required").trim().notEmpty();
        req.checkBody("visaNumber","Visa Number is required").trim().notEmpty();
        req.checkBody("expiryDate", "Expiry date is required").trim().notEmpty();
        req.checkBody("country","Country is required").trim().notEmpty();

		req.asyncValidationErrors()
			.then(() => {
				next();
			
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

};
