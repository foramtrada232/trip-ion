// Database model
const AirTicketPreferencesModel = require("../models/airTicketPreferences.model");
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
const addTicketPreferences = (data) => {
    return new Promise((resolve, reject) => {
        AirTicketPreferencesModel.create(data).then((preference) => {
            UserModel.findByIdAndUpdate({'_id' : preference.userId},{ticketPreferences : preference._id}).exec((err,user) => {
                if (err) {
                    reject({ status: 500, message: 'User Not Updated' });
                } else {
                    resolve({ status: 200, message: "User Updated successfully.",data : preference });
                }
            })
            resolve({ status: 201, message: "Ticket Preferences added successfully.",data : preference });
        }).catch((error) => {
            console.log("error: ", error);
            reject({ status: 500, message: 'Preferences Not Added. Please try again.' });
        })
    })
}


module.exports = {
    addTicketPreferences: addTicketPreferences
}

