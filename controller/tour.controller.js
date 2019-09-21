
// Service
const TourService = require('../services/TourService')


/**
 * Add Accommodation
 */
addTourData = function(req, res){
	const userId = req.user.id
	const tourData = req.body;
	tourData['userId'] = userId;
	TourService.addTourData(tourData).then((response) => {
		return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
	})
}

	module.exports = {
	addTourData : addTourData	
};
