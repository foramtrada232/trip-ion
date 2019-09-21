
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TicketSchema = new mongoose.Schema({

	userId : { type: Schema.Types.ObjectId, ref: 'User' },
	tripId : { type: Schema.Types.ObjectId, ref: 'Trip' },
    nameOfPassenger: {type: String},
	date: {type: Date},
	path: {type: String} //File Path
    
});

module.exports = mongoose.model("Ticket", TicketSchema);
