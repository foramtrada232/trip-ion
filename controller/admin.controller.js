const CryptoJS = require("crypto-js");
key = "tripion@raoinfor";

// Service
const AdminService = require('../services/AdminService')

//model
const UserModel = require("../models/user.model");
const AdminModel = require("../models/admin.model");


	/** 
	 * Admin signup 
	 */ 
    signUp = function(req,res) {
        AdminModel.create(req.body).then((admin) => {
           console.log("admin:",admin)
           return res.status(200).json({ message: "signup sucess",admin })
        }).catch((error) => {
            console.log("error: ", error);
            return res.status(500).json({ message:"not success",error });
        }) 
	}
	
	/** 
	 * Admin login 
	 */ 
	login = function(req, res) {
		const adminData =req.body
		AdminService.login(adminData).then((response) => {
			console.log("adminData:",adminData)
			return res.status(200).json({ message: response.message, token: response.token });
		}).catch((error) => {
			console.log('error:', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	}
	
	/** 
	 * get all user
	 */
	getAllUsers = function(req, res) {
		UserModel.aggregate([
			{
				$match: { }
			},
			{
				$project: {
					_id: 1,
					passport: 1,
					visa: 1,
					tripInquiry: 1,
					pastTrips: 1,
					visaInquiry: 1,
					passportInquiry: 1,
					name: 1,
					contact: 1,
					emailId: 1
				}
			}
		]).exec((err, users) => {
				if (err) {
					res.status(500).send(err);
				} else if (users){
					const encrypted = CryptoJS.AES.encrypt(JSON.stringify(users), process.env.key).toString();
					res.status(200).send({data:encrypted});
				} else {
					res.status(404).json({msg:'No User found.'})
				}
			})
	}

	/**
	 * userId wise get user details
	 */
	getSingleUser = function(req, res) {
		const userId =req.params.userId;
		AdminService.getSingleUser(userId).then((response) => {
			return res.status(response.status ? response.status : 200).json({message: response.message, data: response.data})
		}).catch((error) => {
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
		})
	}

	module.exports = {
		signUp : signUp,
		login : login,
		getSingleUser : getSingleUser,
		getAllUsers : getAllUsers,
};
