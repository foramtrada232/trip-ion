// Database model
const TourModel = require("../models/tour.model");
const UserModel = require("../models/user.model");


const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const CYPHERKEY = process.env.CYPHERKEY;
const _ = require('lodash');
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const ObjectId = require('mongodb').ObjectId;


// Encrypt
const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');

// Decrypt
const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
const plaintext = bytes.toString(CryptoJS.enc.Utf8);


/** 
 * @param {object} userData user details 
 */
const addTourData = (tourData) => {
    return new Promise((resolve, reject) => {
        TourModel.create(tourData).then((tour) => {
            UserModel.findByIdAndUpdate({'_id' : tour.userId},{tourId : tour._id}).exec((err,user) => {
                if (err) {
                    reject({ status: 500, message: 'User Not Updated' });
                } else {
                    resolve({ status: 200, message: "User Updated successfully.",data : user });
                }
            })
            resolve({ status: 201, message: "TourData added successfully.",data : tour });
        }).catch((error) => {
            console.log("error: ", error);
            reject({ status: 500, message: 'TourData Not Added. Please try again.' });
        })
    })
}


module.exports = {
    addTourData: addTourData
}

