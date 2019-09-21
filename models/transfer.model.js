
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TransferSchema = new mongoose.Schema({

    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    to : {type: String},
    from : {type: Date},
    transferBasis : {type: String},
    specialRequest : {type: String},
    train : [{type:String}],
    air : [{type: String}],
    chauffer : [{type:String}],
    cruise : {type: String},
    cityCards : {type: String},
    // selfDrive
    
});

module.exports = mongoose.model("Transfer", TransferSchema);
