
// Service
const TransferService = require('../services/TransferService')


/**
 * Add Accommodation
 */
addTransferData = function(req, res){
	const userId = req.user.id
	const transferData = req.body;
	transferData['userId'] = userId;
	TransferService.addTransferData(transferData).then((response) => {
		return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
	})
}

	module.exports = {
	addTransferData : addTransferData	
};
