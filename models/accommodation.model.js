
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AccommodationSchema = new mongoose.Schema({

    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    destination: {type: String},
    checkIn : {type: Date},
    checkOut : {type: Date},
    dateAndDurationStatus : {type: String},
    noOfpassengers : {
		adult: {type: Number},
		kids: {type: Number},
		old: {type: Number}
    },
    roomOccupancy : {type: String},
    roomCategory : {type: String},
    meal : {type: String},
    culinary : {type: String},
    accommodationType : {type: String},
    smokingRoom : {type: String},
    wheelChair : {type: String},
    specialRequierment : {type: String},
    methodOfCommunication : {type: String},
    budgetPreference : {type: String},
    budgetAmount : {type: String},
    modeOfPayment : {type: String} 
    
});

module.exports = mongoose.model("Accommodation", AccommodationSchema);
