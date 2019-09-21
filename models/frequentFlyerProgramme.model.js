
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const FFPSchema = new mongoose.Schema({

	userId : { type: Schema.Types.ObjectId, ref: 'User' },
    airlines: {type: String},
    ffNumber: {type: Number},
    points : {type: String}
    
});

module.exports = mongoose.model("Ffp", FFPSchema);
