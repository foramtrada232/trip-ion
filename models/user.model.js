/** User Mongo DB model	*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({

	emailId: {type:String,default:null},
	name: {type:String},
	contact: {type:String},
	rewardPoint: {type: String},
	password: { type: String},
	emailHash: { type: String },
	emailConfirmation: { type: Boolean, default: false },
	forgotPasswordHash: { type: String },
	subscription: {type:String},
	passport: [{ type: Schema.Types.ObjectId, ref: 'Passport' }],
	visa: [{ type: Schema.Types.ObjectId, ref: 'Visa' }],
	// preferencesId: [{ type: Schema.Types.ObjectId, ref: 'Preferences' }],
	destinationFinderId: [{ type: Schema.Types.ObjectId, ref:'DestinationFinder'}],
	tripInquiry: [{ type: String, ref: 'TripInquiry' }],
	tourId: [{ type: Schema.Types.ObjectId, ref: 'Tour' }],
	visaInquiry: [{ type: Schema.Types.ObjectId, ref: 'VisaInquiry' }],
	passportInquiry: [{ type: Schema.Types.ObjectId, ref: 'PassportInquiry' }],
	deviceToken: { type: String, default: '' },
	transfers: [{type: Schema.Types.ObjectId, ref: 'Transfer' }],
	ticketPreferences: [{type: Schema.Types.ObjectId, ref: 'TicketPreference' }],
	accommodation: [{type: Schema.Types.ObjectId, ref: 'Accommodation' }]
});

// Boolean: --> hasMoney, canDance, isAvailable (has, can, is)

UserSchema.pre('save', function (next) {
	const user = this;
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			console.log("pass:",user.password)
			next();
		});
	});
 });

module.exports = mongoose.model("User", UserSchema);
