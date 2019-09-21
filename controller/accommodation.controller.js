
// Service
const AccommodationService = require('../services/AccommodationService')


/**
 * Add Accommodation
 */
addAccommodation = function(req, res){
	const userId = req.user.id
	const accommodationData = req.body;
	accommodationData['userId'] = userId;
	AccommodationService.addAccommodation(accommodationData).then((response) => {
		return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
	})
}

	module.exports = {
	addAccommodation : addAccommodation	
};
