// Service
const DestinationFInderService = require('../services/DestinationFinderService');

/**
 * Add user's destination finder
 */
addDestination = function (req, res) {
    const destinationData =req.body;
    console.log("body:",destinationData)
	DestinationFInderService.addDestination(destinationData).then((response) => {
		return res.status(200).json({ message: response.message});
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}


module.exports = {
    addDestination : addDestination
}