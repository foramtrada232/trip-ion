// Database model
const AdminModel = require("../models/admin.model");
const UserModel = require("../models/user.model");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const CYPHERKEY = process.env.CYPHERKEY;
const clc = require("cli-color");
const SALT_WORK_FACTOR = 10;
const CryptoJS = require("crypto-js");
const ObjectId = require('mongodb').ObjectId;

// Encrypt
const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');

// Decrypt
const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');

module.exports = {

    /**
     * @param {object} adminData login details of admin
     */
    login: (adminData) => {
        return new Promise((resolve, reject) => {
            console.log("adminData:", adminData)
            AdminModel.findOne({ emailId: adminData.emailId }, function (err, admin) {
                console.log("admin:", admin);
                if (err) {
                    console.log("err:",err);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else if (!admin) {
                    reject({ status: 404, message: 'No admin found' });
                } else if (admin) {
                    const passwordIsValid = bcrypt.compareSync(adminData.password, admin.password);
                    console.log('valid password:', passwordIsValid);
                    if (!passwordIsValid) {
                        reject({ status: 401, message: "password is not valid", token: null });
                    }
                    const token = jwt.sign({ email: admin.email }, CYPHERKEY, {
                        expiresIn: 86400
                    });
                    const response = { data: admin, token: token };
                    console.log("resp:",response)
                    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(response), process.env.key).toString();
                    resolve({ status: 200, message: "login successfull",token:encrypted});
                } else {
                    reject({ status: 404, message: 'Internal Server Error' });
                }
            });
        })
    },

    /**
     * @param {object} userId wise get user details 
     */
    getSingleUser: (userId) => {
        return new Promise((resolve, reject) => {
            UserModel.aggregate([
                {
                    $match: { '_id': ObjectId(userId) }
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
            ]).exec((err, user) => {
				if (err) {
					reject({ status: 500, message: 'Internal Serevr Error' });
				} else if (user){
                    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.key).toString();
                    resolve({ status: 200, data:encrypted});
				} else {
                    reject({ status: 404, message: 'No User found.' });
				}
			})
        })
    }
}

