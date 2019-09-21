const randomstring = require("randomstring");
const CryptoJS = require("crypto-js");

// Service
const UserService = require('../services/UserService')


/** 
 * user sign up 
 */
signup = function (req, res) {
	const userData = req.body
	console.log("userData:", userData)
	UserService.signup(userData).then((response) => {
		return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
	})
},

	/**
	 * login with facebook
	 */
	facebookLogin = function (req, res) {
		const accessToken = req.body.accessToken;
		console.log("accessToken:", req.body.accessToken)
		UserService.facebookLogin(accessToken).then((response) => {
			return res.status(200).json({ message: response.message, data: response.data });
		}).catch((error) => {
			return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/**
	 * login with google
	 */
	googleLogin = function (req, res) {
		const accessToken = req.body.accessToken;
		console.log("accessToken:", req.body.accessToken)
		UserService.googleLogin(accessToken).then((response) => {
			return res.status(200).json({ message: response.message, data: response.data });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/** 
	 * user login with email
	 */
	login = function (req, res) {
		const userData = {
			emailId: req.body.emailId,
			password: req.body.password
		}
		UserService.login(userData).then((response) => {
			return res.status(response.status ? response.status : 200).json({ message: response.message, token: response.token });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/**Log Out*/
	logOut = function (req, res) {
		console.log(req.user)
		const userId = req.user.id
		UserService.logOut(userId).then((response) => {
			return res.status(200).json({ status: 1, message: response.message, data: response.data });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/** 
	 * login user change password 
	 */
	updatePassword = function (req, res) {
		const userData = {
			userId: req.user.id,
			oldPassword: req.body.oldPassword,
			newPassword: req.body.newPassword,
			confirmPassword: req.body.confirmPassword
		};
		console.log("REQUESTED USER:", req.user)
		if (req.body.newPassword == req.body.confirmPassword) {
			UserService.updatePassword(userData).then((response) => {
				return res.status(response.status ? response.status : 200).json({ message: response.message });
			}).catch((error) => {
				console.log('error:', error);
				return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
			})
		} else {
			res.status(400).json({ message: "New and Confirm password dose not match." });
		}
	},

	/** 
	 * change password without login 
	 */
	forgotPassword = function (req, res) {
		const forgotPasswordHash = randomstring.generate();
		console.log(req.user)
		const userData = {
			emailId: req.body.emailId,
			forgotPasswordHash,
			// link: 'http://localhost:4200/forgot-password'
			link: 'http://localhost:8100/forgot-password'
			// link: 'http://localhost:3000/resetpassword'
			// link: req.protocol + '://' + req.get('host')
		}
		console.log("userData:", userData)
		UserService.forgotPassword(userData).then((response) => {
			return res.status(response.status ? response.status : 200).json({ message: response.message });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/**
	 * email verification after reset password and change password 
	 */
	emailVerification = function (req, res) {
		const userData = {
			emailHash: req.params.hash,
			password: req.body.password
		}
		UserService.emailVerification(userData).then((response) => {
			return res.status(response.status ? response.status : 200).json({ message: response.message });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/**
	 * userId wise get user details
	 */
	getLoginUserData = function (req, res) {
		const userId = req.user.id;
		UserService.getLoginUserData(userId).then((response) => {
			return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data })
		}).catch((error) => {
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/** 
     * get all user
     */
	getAllUsers = function (req, res) {
		UserService.getAllUsers().then((response) => {
			console.log("REQUESTED USER:", req.user);
			return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	},

	/**
	 * Edit profile
	 */
	editProfile = function (req, res) {
		const userData = {
			userId: req.user.id,
			// name: req.body.name,
			// email: req.body.email,
			// contact: req.body.contact
		}
		if (req.body.name) { userData['name'] = req.body.name}
		if (req.body.emailId) { userData['emailId'] = req.body.emailId}
		if (req.body.contact) { userData['contact'] = req.body.contact}
		console.log("userData:", userData);
		UserService.editProfile(userData).then((response) => {
			return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
		}).catch((error) => {
			console.log('error:', error);
			return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
		})
	},


	module.exports = {
		signup: signup,
		login: login,
		logOut: logOut,
		googleLogin: googleLogin,
		facebookLogin: facebookLogin,
		emailVerification: emailVerification,
		updatePassword: updatePassword,
		forgotPassword: forgotPassword,
		editProfile: editProfile,
		getLoginUserData: getLoginUserData,
		getAllUsers : getAllUsers
	}
