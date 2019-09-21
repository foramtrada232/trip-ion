// Database model
const TicketModel = require("../models/ticket.model");

const _ = require('lodash');

/**
 * 
 * @param {Object} ticketData details of user 
 * @param {Object} file ticket file
 */
const addTicket = (ticketData,file) => {
    console.log("file:",file);
    return new Promise((resolve, reject) => {
        TicketModel.create(ticketData).then((ticket) => {
                ticketData.path = file.path;
                TicketModel.findOneAndUpdate({ _id: ticket._id }, { $set: ticketData }, { upsert: true, new: true }).exec((error, ticket) => {
                    if (error) {
                        reject({ status: 500, message: 'Internal Serevr Error' });
                    } else {
                        console.log("user==============================>", ticket);
                        resolve({ status: 200, message: 'Ticket Added Successfully.', data: ticket });
                    }
                })
            resolve({ status: 201, message: "Ticket added successfully." });
        }).catch((error) => {
            console.log("error:",error);
            reject({ status: 500, message: 'Ticket not added. Please try again.' });
        })
    })
}

/**
 * @param {String} userId wise get user's ticket
 */
const getTicketByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        TicketModel.findOne({userId : userId}).exec((error, ticket) => {
            if (error) {
                reject({ status: 500, message: 'Internal Server Error.' });
            } else if (ticket){
                resolve({ status: 200, message: 'Get Ticket.', data: ticket });
            } else { 
                reject({status: 404, message: "No Ticket Found."})
            }
        })
    })
}

/**
 * @param {String} tripId wise get ticket 
 */
const getTicketByTripId = (tripId) => {
    return new Promise((resolve, reject) => {
        TicketModel.find({tripId : tripId}).exec((error, voucher) => {
            if (error) {
                reject({status: 500, message: 'Internal Server Error.' })
            } else if(voucher) {
                resolve({status: 200, message: 'Get Ticket.', data: voucher})
            } else {
                reject({status: 404, message: "No Ticket Found."})
            }
        })
    })
}

module.exports = {
   addTicket : addTicket,
   getTicketByUserId : getTicketByUserId,
   getTicketByTripId : getTicketByTripId
}
