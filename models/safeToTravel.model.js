
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const FfpSchema = new mongoose.Schema({

	userId : { type: Schema.Types.ObjectId, ref: 'User' },
    country: {type: String},
    noOfPassengers : {
		adult: {type: Number},
		kids: {type: Number},
		old: {type: Number}
	}, 
    noOfPassengers : {
		from: {type: Date},
		to: {type: Date}
	}, 
});

module.exports = mongoose.model("Ffp", FfpSchema);
