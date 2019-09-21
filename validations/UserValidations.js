module.exports = {
	/**
	 *  validation for user signup 
	 */
	signup(req, res, next) {
		req.checkBody("name", "Name is required").trim().notEmpty();
		req.checkBody("emailId", "Email is required").trim().notEmpty();
		req.checkBody("emailId", "Email is not valid").trim().isEmail();
		req.checkBody("contact", "Contact is required").trim().notEmpty();
		req.checkBody("contact", "Enter only number").trim().isNumeric();
		req.checkBody("password", "Password is required").trim().notEmpty();
		req.checkBody("password", "Password must be 6 to 20 length").trim().len(6, 20);

		req.asyncValidationErrors()
			.then(() => {
				next();
			})
			.catch(errors => res.status(500).json({
				message: errors[0].msg,
			}));
	},

	/** 
	 * login validation
	 */
	login(req, res, next) {
		req.checkBody("emailId", "Email is required").trim().notEmpty();
		req.checkBody("password", "Password is required").trim().notEmpty();

		req.asyncValidationErrors()
			.then(() => {
				next();
			})
			.catch(errors => res.status(500).json({
				errors: errors[0].msg,
			}));
	},

	/**
	 *  change password validation
	 */
	updatePassword(req, res, next) {
		console.log(req.body)
		req.checkBody("oldPassword", "Old paasword is required").trim().notEmpty();
		req.checkBody("newPassword", "New password is required").trim().notEmpty();
		req.checkBody("confirmPassword", "ConfirmPassword is not match with password").equals(req.body.newPassword);

		req.asyncValidationErrors()
			.then(() => {
				next();
			})
			.catch(errors => res.status(500).json({
				success: false,
				errors: errors[0].msg,
			}));
	},

	/**
	 *  forgot password validation 
	 */
	forgotPassword(req, res, next) {
		req.checkBody("emailId", "Email is required").trim().notEmpty();
		req.checkBody("emailId", "Email is not valid").trim().isEmail();

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
