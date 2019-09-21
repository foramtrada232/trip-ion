
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PaymentRequestSchema = new mongoose.Schema({

    amount: {type: Number},
	status: {type: String},
	content: {type: String},
	discount: {type: String}
    
});

module.exports = mongoose.model("PaymentRequest", PaymentRequestSchema);
