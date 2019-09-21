

const mongoose = require("mongoose");

const DocumentRequestSchema = new mongoose.Schema({

	title: {type:String,required: true},
	content: {type:String,required: true},
	status: { type: String, required: true }

});



module.exports = mongoose.model("documentRequest", DocumentRequestSchema);
