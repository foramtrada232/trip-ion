module.exports = {

    
	/** validation for Add Visa */
	addVoucher(req, res, next) {
        req.checkBody("userId", "User Id is required").trim().notEmpty();
        req.checkBody("tripId","Trip Id is required").trim().notEmpty();
        req.checkBody("type","Type is required").trim().notEmpty();

		req.asyncValidationErrors()
			.then(() => {
				next();
			
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

};
