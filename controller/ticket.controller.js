// Service
const TicketService = require('../services/TicketService');

/**
 * Admin add user's ticket
 */
addTicket = function (req, res) {
	const ticketData =req.body;
	const file = req.file;
	TicketService.addTicket(ticketData,file).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
	})
}

/**
 * user get own ticket
 */
 getTicketByUserId = function (req, res) {
     const userId = req.params.userId;                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     TicketService.getTicketByUserId(userId).then((response) => {
         return res.status(200).json({message: response.message, data:response.data});
     }).catch((error) => {
         console.log("error:",error)
         return res.status(error.status ? error.status : 500).json({message : error.message ? error.message : 'Internal Server Error'})
     })
 }

 /**
  * Trip wise get ticket
  */
 getTicketByTripId = function (req, res) {
    const tripId = req.params.tripId
    TicketService.getTicketByTripId(tripId).then((response) => {
        return res.status(response.status ? response.status : 200).json({message : response.message, data:response.data});
    }).catch((error) => {
        return res.status(error.status ? error.status : 500).json({message : error.message ? error.message : 'Internal Server Error'})
    })
}

module.exports = {
    addTicket : addTicket,
    getTicketByUserId : getTicketByUserId,
    getTicketByTripId : getTicketByTripId
}