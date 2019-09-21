// Database model
const VisaModel = require("../models/visa.model");
const UserModel = require("../models/user.model");

const _ = require('lodash');

/**
 * User's details and visa file
 * @param {Object} visaData user details related visa
 * @param {Object} file for visa
 */
const addVisa = (visaData,file) => {
    console.log("file:",file)
    return new Promise((resolve, reject) => {
        VisaModel.create(visaData).then((visa) => {
                visaData.files = file.path;
                VisaModel.findOneAndUpdate({ _id: visa._id }, { $set: visaData }, { upsert: true, new: true }).exec((error, visa) => {
                    if (error) {
                        reject({ status: 500, message: 'Internal Serevr Error' });
                    } else {
                        console.log("user==============================>", visa);
                        UserModel.findOne({_id:visa.userId}).exec((err, user) => {
                            if (err) {
                                reject({status: err.status ? err.status : 500, message: err.message ? err.message : 'Internal Server Error.'})
                            } else {
                                user.visa.push(visa._id);
                                user.save();
                                console.log("user==========>",user)
                            }
                        })
                        resolve({ status: 200, message: 'Visa Added Successfully.', data: visa });
                    }
                })
            resolve({ status: 201, message: "Visa add successfully." });
        }).catch((error) => {
            console.log("error:",error);
            reject({ status: 500, message: 'Visa not added. Please try again.' });
        })
    })
}

module.exports = {
   addVisa : addVisa
}
