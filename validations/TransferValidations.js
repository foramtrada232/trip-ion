module.exports = {

	/** login validation */
	addTransferData(req, res, next) {
        req.checkBody("to", "To is required").trim().notEmpty();
        req.checkBody("from", "From is required").trim().notEmpty();
        req.checkBody("transferBasis", "Transfer Basis is required").trim().notEmpty();
        req.checkBody("specialRequest", "Special Request is required").trim().notEmpty();
        req.checkBody("train", "train is required").trim().notEmpty();
        req.checkBody("air", "Air is required").trim().notEmpty();
        req.checkBody("chauffer", "Chauffer is required").trim().notEmpty();
        req.checkBody("cruise", "Cruise is required").trim().notEmpty();
        req.checkBody("cityCards", "City Cards is required").trim().notEmpty();
        // req.checkBody("selfDrive", "Self Drive is required").trim().notEmpty();
       
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
