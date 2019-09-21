// Database model
const PassportModel = require("../models/passport.model");
const UserModel = require("../models/user.model");

const _ = require('lodash');

/**
 * @param {Object} passportData details of user for passport
 * @param {Object} file passport file
 */
const addPassport = (passportData,file) => {
    console.log("file:",typeof file)
    return new Promise((resolve, reject) => {
        PassportModel.create(passportData).then((passport) => {
                passportData.files = file.path;
                PassportModel.findOneAndUpdate({ _id: passport._id }, { $set: passportData }, { upsert: true, new: true }).exec((error, passports) => {
                    if (error) {
                        reject({ status: 500, message: 'Internal Serevr Error' });
                    } else {
                        console.log("user==============================>", passports);
                        UserModel.findOne({_id:passport.userId}).exec((err, user) => {
                            if (err) {
                                reject({status: err.status ? err.status : 500, message: err.message ? err.message : 'Internal Server Error.'})
                            } else {
                                user.passport.push(passports._id);
                                user.save();
                                console.log("user==========>",user)
                            }
                        })
                        resolve({ status: 200, message: 'User Added Successfully.', data: passports });
                    }
                })
            resolve({ status: 201, message: "Passport add successfully." });
        }).catch((error) => {
            console.log("error:",error);
            reject({ status: 500, message: 'Passport not added. Please try again.' });
        })
    })
}

module.exports = {
   addPassport : addPassport
}
