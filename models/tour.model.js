
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TourSchema = new mongoose.Schema({

    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    destination : {type: String},
    tourBasis : {type: String},
    itineraryPace : {type: Number},
    languagePreferred : {type: String},
    durationPreferences : {type: String},
    specialRequest : {type: String}
    
});

module.exports = mongoose.model("Tour", TourSchema);
