
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PaymentSchema = new mongoose.Schema({

    inquiryId: {type: Schema.Types.ObjectId},
	inquiryType: {type: String},
	amount: {type: Number},
	datetime: {type: Date},
	transactionId: {type: String},
	status: {type: Boolean},
    
});

module.exports = mongoose.model("Payment", PaymentSchema);
