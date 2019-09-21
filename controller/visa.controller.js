// Service
const VisaService = require('../services/VisaService');

/**
 * user add visa details & visa
 */
addVisa = function (req, res) {
	console.log('req.body=================>', req.body);
	console.log('req.file====================>', req.file);
	const visaData =req.body;
	const file = req.file;
	VisaService.addVisa(visaData,file).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

module.exports = {
    addVisa : addVisa
}