// Database model
const UserModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const CYPHERKEY = process.env.CYPHERKEY;
const clc = require("cli-color");
const clcError = clc.red.bold;
const multer = require('multer');
const _ = require('lodash');
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const request = require("request");
const ObjectId = require('mongodb').ObjectId;


// Encrypt
const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');

// Decrypt
const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
const plaintext = bytes.toString(CryptoJS.enc.Utf8);

// Service
const EmailService = require("./EmailService");

// const file
const config = require("../config")

/**
 * Facebook login using 
 * @param {String} accessToken facebook authentication
 */
const facebookLogin = (accessToken) => {
    return new Promise((resolve, reject) => {
        facebookAuthentication(accessToken).then((response) => {
            console.log("RESPONSE:", response)
            UserModel.findOne({ emailId: response.data.emailId }).exec((err, user) => {
                if (err) {
                    console.log("errrrrrr:", err);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else if (user) {
                    console.log("userrrrrrrrrrrrrrrrrrrr:", user)
                    const payload = { user };
                    var token = jwt.sign(payload, CYPHERKEY);
                    const tokenData = { accessToken: token }
                    resolve({ status: 200, message: 'Login Successfull', data: tokenData })
                } else {
                    console.log("response============>", response)
                    UserModel.create(response.data, (useerr, userres) => {
                        if (useerr) {
                            console.log('usererror: ', useerr);
                            reject({ status: 500, message: 'Internal Server Error' });
                        } else {
                            console.log("userres:", userres)
                            const payload = { userres };
                            var token = jwt.sign(payload, CYPHERKEY);
                            const tokenData = { accessToken: token }
                            resolve({ status: 200, message: 'Login Successfull', data: tokenData })
                        }
                    });
                }
            })
        }).catch((error) => {
            reject({ status: 500, message: 'Internal Sever Error' });
        });
    });
}

/**
 * Facebook Authentication Function For Decoding AccessToken
 * @param {String} accessToken 
 */
function facebookAuthentication(accessToken) {
    return new Promise((resolve, reject) => {
        let url = config.fbUrl + '?access_token=' + accessToken + '&debug=all&fields=id,name,first_name,last_name,locale,gender,email&format=json&method=get&pretty=1&suppress_http_code=1';
        console.log('API Url For Facebook', url);
        request.get(url, (err, response) => {
            if (JSON.parse(response.body).error) {
                console.log("ERRdgrgrOR:", err)
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                const profile = JSON.parse(response.body)
                console.log("profile:", profile);
                if (profile.email) {
                    const newUser = {
                        name: profile.name,
                        emailId: profile.email,
                        facebookId: profile.id
                    }
                    resolve({ status: 200, message: 'Login Successfull', data: newUser })
                } else {
                    const newUser = {
                        name: profile.name,
                        // emailId: profile.email,
                        facebookId: profile.id
                    }
                    resolve({ status: 200, message: 'Login Successfull', data: newUser })
                }

            };
        })
    })
}

/**
 * Google login using
 * @param {String} accessToken google authentication
 */
const googleLogin = (accessToken) => {
    return new Promise((resolve, reject) => {
        googleAuthentication(accessToken).then((response) => {
            UserModel.findOne({ emailId: response.data.emailId }).exec((err, user) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Server Error' });
                } else if (user) {
                    const payload = { user };
                    var token = jwt.sign(payload, CYPHERKEY);
                    const tokenData = { accessToken: token }
                    resolve({ status: 200, message: 'Login Successfull', data: tokenData })
                } else {
                    UserModel.create(response.data, (useerr, userres) => {
                        if (useerr) {
                            reject({ status: 500, message: 'Internal Server Error' });
                        } else {
                            const payload = { userres };
                            var token = jwt.sign(payload, CYPHERKEY);
                            const tokenData = { accessToken: token }
                            resolve({ status: 200, message: 'Login Successfull', data: tokenData })
                        }
                    })
                }
            })
        }).catch((error) => {
            reject({ status: 500, message: 'Internal Sever Error' });
        });
    });
}
/**
* Google Authentication Function For Decoding AccessToken
* @param {string} accessToken
* @returns {Promise} Decode User Details
*/
function googleAuthentication(accessToken) {
    return new Promise((resolve, reject) => {
        let url = config.googleUrl + accessToken;
        console.log('API Url For Google', url);
        request.get(url, (err, response) => {
            if (err) {
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log("resp:", response.body);
                const profile = JSON.parse(response.body);
                const newUser = {
                    name: profile.displayName,
                    emailId: profile.emails[0].value
                }
                resolve({ status: 200, message: 'Login Successfull', data: newUser });
            }
        });
    });
}

/** 
 * @param {object} userData user details 
 */
const signup = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ emailId: userData.emailId }).exec((err, foundUser) => {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' })
            } else if (foundUser) {
                resolve({ status: 409, message: 'Email already registerd.' })
            } else {
                UserModel.create(userData).then((user) => {
                    resolve({ status: 201, message: "Register successfully." });
                }).catch((error) => {
                    console.log(clcError("error: ", error));
                    reject({ status: 500, message: 'Not registerd. Please try again.' });
                })
            }
        })

    })
}

/**
 * @param {object} userData login details of user
 */
const login = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ emailId: userData.emailId }, function (err, user) {
            if (err) {
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else if (!user) {
                reject({ status: 404, message: 'No user found' });
            } else if (user) {
                console.log("USER:",user)
                const passwordIsValid = bcrypt.compareSync(userData.password, user.password);
                if (!passwordIsValid) {
                    reject({ status: 401, message: "password is not valid", token: null });
                }
                const token = jwt.sign({ id: user._id }, CYPHERKEY, {
                    expiresIn: 86400
                });
                console.log("token:", token)
                // const response = { data: user, token: token };
                const encrypted = CryptoJS.AES.encrypt(JSON.stringify(token), process.env.key).toString();
                resolve({ status: 200, message: "login successfull", token: token });
            } else {
                reject({ status: 404, message: 'Internal Server Error' });
            }
        });
    })
}

/**
 * 
 * @param {*} userId 
 * wise logout and devicetoken null
 */
const logOut = (userId) => {
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({ _id: userId }, { $set: { deviceToken: '' } }, { upsert: true, new: true }, function (err, user) {
            if (err) {
                reject({ status: 500, message: 'Internal Serever Error' });
            } else {
                console.log('post============>', user);
                resolve({ status: 200, message: 'Log Out Successfully', data: user });
            }
        })
    })
}

/**
 * @param {object} userData 
 * change password data
 */
const updatePassword = (userData) => {
    return new Promise((resolve, reject) => {
        console.log("userData:", userData)
        const confirmPassword = bcrypt.hashSync(userData.confirmPassword, 10);
        UserModel.findOne({ _id: userData.userId }).exec((err, user) => {
            if (err) {
                reject({ status: 400, message: "User not found." });
            } else if (user) {
                console.log("user:", user);
                const passwordIsValid = bcrypt.compareSync(userData.oldPassword, user.password);
                if (!passwordIsValid) {
                    reject({ status: 401, message: "Old password is not valid." });
                } else {
                    UserModel.findOneAndUpdate(
                        { _id: userData.userId },
                        { password: confirmPassword }
                    ).exec((err, updatedUser) => {
                        if (err) {
                            reject({ status: 400, message: "Password does not updated." });
                        } else if (updatedUser) {
                            resolve({ status: 200, message: "Password sucessfully updated." });
                        } else {
                            reject({ status: 400, message: "Internal Server Error." });
                        }
                    })
                }
            }
        });
    })
}

/**
 * @param {object} userData 
 * forgot password details
 */
const forgotPassword = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate(
            { emailId: userData.emailId },
            { forgotPasswordHash: userData.forgotPasswordHash, emailHash: userData.forgotPasswordHash, emailConfirmation: false },
        ).then((data) => {
            console.log("data", data);
            if (data) {
                EmailService.forgotPassword(
                    data.emailId,
                    data.name,
                    userData.link + '/' + userData.forgotPasswordHash,
                );
                resolve({ status: 200, message: "Plase check your mail." });
            } else {
                reject({ status: 400, message: "Email not found." });
            }
        }).catch((err) => {
            console.log(clcError("Err while find with email verification:-", err));
            resolve({ status: 500, message: "Something went wrong. Please try again." })
        });
    })
}

/**
 * @param {object} userData 
 * verification after reset password
 */
const emailVerification = (userData) => {
    return new Promise((resolve, reject) => {
        console.log("userData", userData)
        const Password = bcrypt.hashSync(userData.password);
        UserModel.findOneAndUpdate(
            { emailHash: userData.emailHash, emailConfirmation: false },
            { emailHash: "", emailConfirmation: true, password: Password },
        ).then((data) => {
            console.log("data:", data)
            if (data) {
                resolve({ status: 200, message: "Password sucessfully updated." });
            } else {
                reject({ status: 400, message: "Invalid email verification link." });
            }
        }).catch((err) => {
            console.log(clcError("Error while find with email verification:-", err));
            reject({ status: 500, message: "Something went wrong. Please try again." });
        });
    })
}

  /**
   * @param {object} userId 
   * wise get user details 
   */
  const getLoginUserData = (userId) => {
    return new Promise((resolve, reject) => {
        UserModel.aggregate([
            {
                $match: { '_id': ObjectId(userId) }
            },
            {
                $project: {
                    _id: 1,
                    emailId: 1,
                    name: 1,
                    contact: 1
                }
            },
            // {
            //     		$unwind: {
            //     			path: '$data',
            //     			preserveNullAndEmptyArrays: true
            //     		}
            //         }
        ]).exec((err, user) => {
            if (err) {
                reject({ status: 500, message: 'Internal Server Error' });
            } else if (user) {
                resolve({ status: 200, data: user });
            } else {
                reject({ status: 404, message: 'No User found.' });
            }
        })
    })
}

/**
 * @param {object} userData wise edit profile
 */
const editProfile = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate({ _id: userData.userId }, { $set: {userData}}, { upsert: true, new: true }).exec((err, updatedUser) => {
                if (err) {
                    reject({ status: 500, message: "User not updated." });
                }
                else {
                    UserModel.aggregate([
                        {
                            $match : {'_id' : ObjectId(userData.userId)}
                        },
                        {
                            $project : {
                                name : 1,
                                contact : 1,
                                emailId : 1
                            }
                        }
                    ]).exec((err, user) => {
                        if (err) {
                            reject({ status: 500, message: "User not updated." }); 
                        } else {
                            resolve({ status: 200,message:'User Updated Sucessfully.', data: user });
                        }
                    })
                }
            })
    })
}

/**
 * Get All Users
 */
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.aggregate([
            {
                $match: {}
            },
            {
                $project: {
                    _id: 1,
                    emailId: 1,
                    name: 1,
                    contact: 1
                }
            }
        ]).exec((err, users) => {
            if (err) {
                reject({ status: 500, message: 'Internal Server Error' });
            } else if (users) {
                console.log("users:", users)
                resolve({ status: 200, meassage: 'Get All Users.', data: users });
            } else {
                reject({ status: 404, message: 'No User found.' });
            }
        })
    })
}

module.exports = {
    facebookLogin: facebookLogin,
    googleLogin: googleLogin,
    signup: signup,
    login: login,
    logOut: logOut,
    emailVerification: emailVerification,
    forgotPassword: forgotPassword,
    updatePassword: updatePassword,
    editProfile: editProfile,
    getLoginUserData : getLoginUserData,
    getAllUsers : getAllUsers
}

