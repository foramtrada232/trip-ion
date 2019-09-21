// Database model
const DestinationModel = require("../models/destinationFinder.model");
const UserModel = require("../models/user.model");

const _ = require('lodash');

/**
 * preferences form
 * @param {Object} destinationData user preferences details 
 */
const addDestination = (destinationData) => {
    return new Promise((resolve, reject) => {
        console.log("destinationData:", destinationData);
        UserModel.findOne({ emailId: 'dixit200598@gmail.com' }).exec((err, user) => {
            if (err) {
                reject({ status: 500, message: 'No user found.' })
            } else {
                console.log("user:", user)
                DestinationModel.findOneAndUpdate({ userId: user._id }, destinationData).exec((err, destination) => {
                    if (err) {
                        reject({ status: 500, message: "User's destination not found." })
                    } else {
                        console.log("destination:", destination)
                        UserModel.findOne({ _id: destination.userId }).exec((err, user) => {
                            if (err) {
                                reject({ status: err.status ? err.status : 500, message: err.message ? err.message : 'Internal Server Error.' })
                            } else {
                                console.log("user===========>", user);
                                user.destinationFinderId.push(destination._id);
                                user.save();
                            }
                            resolve({ status: 201, message: "Destination add successfully." });
                        })
                    }
                })
            }
        })
    })
}

module.exports = {
    addDestination: addDestination
}
