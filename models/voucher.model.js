
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const VoucherSchema = new mongoose.Schema({

	userId : { type: Schema.Types.ObjectId, ref: 'User' },
	tripId : { type: Schema.Types.ObjectId, ref: 'Trip' },
    type: {type: String}, 
	status: {type: String},
	amendments : [{
		dateTime: {type: Date},
		message: {type: String}
	}],
	path: {type: String} 
    
});

module.exports = mongoose.model("Voucher", VoucherSchema);
