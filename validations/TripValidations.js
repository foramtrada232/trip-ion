
module.exports = {

    
	/** validation for Add Preferences */
	addTrip(req, res, next) {
        req.checkBody("userId", "User id is required").trim().notEmpty();
        req.checkBody("intendedDateOfDeparture","Date Of Departure is required").trim().notEmpty();
        req.checkBody("intendedDateOfArrival","Date Of Arrival is required").trim().notEmpty();
        // req.checkBody("passengers","passengers is required").trim().notEmpty();
        req.checkBody("durationOfTravel","Duration Of Travel is required").trim().notEmpty();
        req.checkBody("cityOfDeparture","City Of Departure is required").trim().notEmpty();
        req.checkBody("occasion","Occasion is required").trim().notEmpty();
        req.checkBody("atmosphere","Atmosphere is required").trim().notEmpty();
        // req.checkBody("meals","Meals is required").trim().notEmpty();
        req.checkBody("budgetAmount","Budget Amount is required").trim().notEmpty();
        
		req.asyncValidationErrors()
			.then(() => {
				next();
			
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

};



