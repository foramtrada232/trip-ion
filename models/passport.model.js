
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PassportSchema = new mongoose.Schema({

	userId : { type: Schema.Types.ObjectId, ref: 'User' },
	documentRequest: {type: Schema.Types.ObjectId, ref: 'DocumentRequest' },
	paymentRequest: {type : Schema.Types.ObjectId, ref: 'PaymentRequest'},
	name: {type: String},
	passportNumber: {type: String},
	expiryDate: {type: Date},
    files : {type: String}
});

module.exports = mongoose.model("Passport", PassportSchema);
