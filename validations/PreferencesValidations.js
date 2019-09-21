
module.exports = {

    
	/** validation for Add Preferences */
	addPreferences(req, res, next) {
		// req.checkBody("userId", "User id is required").trim().notEmpty();
        req.checkBody("culinary", "Culinary  is required").trim().notEmpty();
        req.checkBody("flightPreference","Flight Preference is required").trim().notEmpty();
        req.checkBody("flightSeatPreference","Flight-Seat Preference is required").trim().notEmpty();
        req.checkBody("seatbeltExtender","Seatbelt Extender is required").trim().notEmpty();
        req.checkBody("wheelChair","wheelChair is required").trim().notEmpty();
        req.checkBody("modeOfTransfer","Mode Of Transfer is required").trim().notEmpty();
        req.checkBody("transferBases","Transfer Bases is required").trim().notEmpty();
        req.checkBody("languagePrefered","Language Prefered is required").trim().notEmpty();
        req.checkBody("accomodation","Accomodation is required").trim().notEmpty();
        req.checkBody("roomCategory","Room Category is required").trim().notEmpty();
        req.checkBody("smoker","Smoker is required").trim().notEmpty();
        req.checkBody("additionalTravelExperience","Additional Travel Experience is required").trim().notEmpty();
        req.checkBody("methodOfCommunication","Method Of Communication is required").trim().notEmpty();
        req.checkBody("budgetPreference","Budget Preference is required").trim().notEmpty();
        req.checkBody("paymentMode","paymentMode is required").trim().notEmpty();


		req.asyncValidationErrors()
			.then(() => {
				next();
			
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

};



