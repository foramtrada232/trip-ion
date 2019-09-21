
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TripInquirySchema = new mongoose.Schema({

    tripId: {type: Schema.Types.ObjectId, ref: 'Trip'},
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	tripInquiryFormId: {type: Schema.Types.ObjectId, ref: 'Trip'},
	documentRequest: {type: Schema.Types.ObjectId, ref: 'DocumentRequest'},
	paymentRequest: {type: Schema.Types.ObjectId, ref: 'PaymentRequest'},
	quotes: [{type: String}], //Array of quote
	plans: [{type: String}], // Array of plan
	status: {type: String},
	remark: {type: String}
    
});

module.exports = mongoose.model("TripInquiry", TripInquirySchema);
