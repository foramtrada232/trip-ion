const CryptoJS = require("crypto-js");


const decryptData = function (req, res, next) {
    const decryptedData = CryptoJS.AES.decrypt(req.body.encrypted, process.env.key).toString(CryptoJS.enc.Utf8);
    console.log("decrypted",decryptedData);
    const data = JSON.parse(decryptedData)
    console.log("data:",data)
    req.body = data;
    next();
}
module.exports = decryptData;
