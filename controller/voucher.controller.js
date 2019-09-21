// Service
const VoucherService = require('../services/VoucherService');

/**
 * user add voucher
 */
addVoucher = function (req, res) {
	const voucherData =req.body;
	const file = req.file;
	
	VoucherService.addVoucher(voucherData,file).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error:', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	})
}

/**
 * userId wise get voucher
 */
 getVoucherByUserId = function (req, res) {
     const userId = req.params.userId;
     VoucherService.getVoucherByUserId(userId).then((response) => {
         return res.status(200).json({message: response.message, data:response.data});
     }).catch((error) => {
         return res.status(error.status ? error.status : 500).json({message : error.message ? error.message : 'Internal Server Error'})
     })
 }

 /**
  * tripId wise get voucher
  */
 getVoucherByTripId = function (req, res) {
	 const tripId = req.params.tripId
	 VoucherService.getVoucherByTripId(tripId).then((response) => {
		 return res.status(response.status ? response.status : 200).json({message : response.message, data:response.data});
	 }).catch((error) => {
		 return res.status(error.status ? error.status : 500).json({message : error.message ? error.message : 'Internal Server Error'})
	 })
 }

module.exports = {
    addVoucher : addVoucher,
	getVoucherByUserId : getVoucherByUserId,
	getVoucherByTripId : getVoucherByTripId
}