
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DestinationFinderSchema = new mongoose.Schema({

    userId : {type:Schema.Types.ObjectId, ref:'User'},
    occasionOfVacation : {type: String},
    atmosphereOfVacation : {type: String},
    climate: {type: String},
    terrian : {type: String},
    interest : [{type: String}],
    additionalTravelExperience : [{type: String}],
    map : {type: String}
});

module.exports = mongoose.model("DestinationFinder", DestinationFinderSchema);



