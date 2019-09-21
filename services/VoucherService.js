// Database model
const VoucherModel = require("../models/voucher.model");

const _ = require('lodash');

/**
 * user's voucher details for trip 
 * @param {Object} voucherData details of user
 * @param {object} file  for voucher
 */
const addVoucher = (voucherData,file) => {
    console.log("file:",file);
    return new Promise((resolve, reject) => {
        VoucherModel.create(voucherData).then((voucher) => {
                voucherData.path = file.path;
                VoucherModel.findOneAndUpdate({ _id: voucher._id }, { $set: voucherData }, { upsert: true, new: true }).exec((error, voucher) => {
                    if (error) {
                        reject({ status: 500, message: 'Internal Serevr Error' });
                    } else {
                        console.log("user==============================>", voucher);
                        resolve({ status: 200, message: 'Voucher Added Successfully.', data: voucher });
                    }
                })
            resolve({ status: 201, message: "Voucher added successfully." });
        }).catch((error) => {
            console.log("error:",error);
            reject({ status: 500, message: 'Voucher not added. Please try again.' });
        })
    })
}

/**
 * user/admin get voucher
 * @param {String} userId wise get voucher
 */
const getVoucherByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        VoucherModel.findOne({userId : userId}).exec((error, voucher) => {
            if (error) {
                reject({ status: 500, message: 'Internal Server Error.' });
            } else if (voucher){
                resolve({ status: 200, message: 'Get Voucher.', data: voucher });
            } else { 
                reject({status: 404, message: "No Voucher Found."})
            }
        })
    })
}

/**
 * Admin get voucher
 * @param {String} tripId wise get voucher
 */
const getVoucherByTripId = (tripId) => {
    return new Promise((resolve, reject) => {
        VoucherModel.find({tripId : tripId}).exec((error, voucher) => {
            if (error) {
                reject({status: 500, message: 'Internal Server Error.' })
            } else if(voucher) {
                resolve({status: 200, message: 'Get Voucher.', data: voucher})
            } else {
                reject({status: 404, message: "No Voucher Found."})
            }
        })
    })
}

module.exports = {
   addVoucher : addVoucher,
   getVoucherByUserId : getVoucherByUserId,
   getVoucherByTripId : getVoucherByTripId
}
