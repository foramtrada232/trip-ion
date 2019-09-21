
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const QuoteSchema = new mongoose.Schema({

    basic: {type: String},
	hotels: {type: String},
	sightseeing: {type: String},
	finalCost: {type: Number}
    
});

module.exports = mongoose.model("Quote", QuoteSchema);
