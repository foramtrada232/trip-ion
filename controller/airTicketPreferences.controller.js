
// Service
const TicketPreferencesService = require('../services/AirTicketPreferencesService')


addTicketPreferences = function(req, res){
	const userId = req.user.id
	const userData = req.body;
	userData['userId'] = userId;
	TicketPreferencesService.addTicketPreferences(userData).then((response) => {
		return res.status(response.status ? response.status : 200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status({ status: 500 }).json({ message: error.message ? error.message : 'internal server error' });
	})
}

	module.exports = {
	addTicketPreferences : addTicketPreferences	
};
