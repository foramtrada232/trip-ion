
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TicketPreferencesSchema = new mongoose.Schema({

    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    departureDate : {type: Date},
    arrivalDate : {type: Date},
    to : {type:String},
    from : {type: Date},
    dateAndDurationStatus : {type: String},
    noOfpassengers : {
		adult: {type: Number},
		kids: {type: Number},
		old: {type: Number}
    },
    journeyType : {type: String},
    flightTierPreference : {type: String},
    flightSeatPreference : {type: String},
    flightMealPreference : {type: String},
    seatBeltExtender : {type: String},
    wheelChairAssistance : {type: String},
    methodOfCommunication : {type: String},
    budgetPreference : {type: String},
    budgetAmount : {type: Number},
    modeOfPayment : {type: String} 
    
});

module.exports = mongoose.model("TicketPreference", TicketPreferencesSchema);
