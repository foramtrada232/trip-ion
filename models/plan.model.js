
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PlanSchema = new mongoose.Schema({

    title: {type: String},
	content: {type: String}
    
});

module.exports = mongoose.model("Plan", PlanSchema);
