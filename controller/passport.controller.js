// Service
const PassportService = require('../services/PassportService');

/**
 * Add passport details & passport
 */
addPassport = function (req, res) {
	console.log('req.body=================>', req.body);
	console.log('req.file====================>', req.file);
	const passportData =req.body;
	const file = req.file;
	PassportService.addPassport(passportData,file).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
	})
}

module.exports = {
    addPassport : addPassport
}