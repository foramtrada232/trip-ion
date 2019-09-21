
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const VisaSchema = new mongoose.Schema({

	userId : { type: Schema.Types.ObjectId, ref: 'User' },
	documentRequest: {type: Schema.Types.ObjectId, ref: 'DocumentRequest' },
	paymentRequest: {type : Schema.Types.ObjectId, ref: 'PaymentRequest'},
	name: {type: String},
	passportNumber: {type: String},
	expiryDate: {type: Date},
	visaNumber: {type: String},
	country: {type: String},
    files : {type: String}
});

module.exports = mongoose.model("Visa", VisaSchema);
