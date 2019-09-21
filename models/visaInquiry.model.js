    
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const VisaInquirySchema = new mongoose.Schema({
	
	userId : { type: Schema.Types.ObjectId, ref: 'User' },
	name : {type: String},
	passportNumber : {type: String},
	dob : {type: Date},
	placeOfBirth : {type: String},
	address : {type: String},
	durationOfTravel : {type: String},
	dateOfArrival : {type: Date},
	purposeOfVisit : {type: String},
	typeOfVisa : {type: String},
	// previousRejection : 
	passportValidity : {type: Date},
	sponserDetails : {type: String},
	occupation : {type: String},
	previousInternationalTravel : {type: String}
    
});

module.exports = mongoose.model("VisaInquiry", VisaInquirySchema);
