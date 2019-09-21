
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PassportInquirySchema = new mongoose.Schema({

    documentRequest: {type: Schema.Types.ObjectId, ref: 'DocumentRequest' },
	paymentRequest: {type : Schema.Types.ObjectId, ref: 'PaymentRequest'},
	status: {type: String},
	remark: {type: String}
    
});

module.exports = mongoose.model("PassportInquiry", PassportInquirySchema);
