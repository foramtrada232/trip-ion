
module.exports = {

    
	/** validation for Add Preferences */
	addTicket(req, res, next) {
        req.checkBody("userId", "User id is required").trim().notEmpty();
        req.checkBody("tripId", "Trip id is required").trim().notEmpty();
        req.checkBody("nameOfPassenger", "Name is required").trim().notEmpty();
        req.checkBody("date", "Date is required").trim().notEmpty();
        // req.checkBody("path", "File is required").trim().notEmpty();
        
		req.asyncValidationErrors()
			.then(() => {
				next();
			
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

};



