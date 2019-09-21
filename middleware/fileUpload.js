const multer = require('multer');
/**
* Function To FileUpload Using Multer
* @param {Object} - File Object To Upload
* @returns {Array} - Return Array Of Files With Details
*/
const upload = (file, next) => {
    if (file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/')
            },
            filename: function (req, file, cb) {
                console.log("middelware file:", file)
                cb(null, file.fieldname + '_' + Date.now())
            }
        })
        return multer({ storage: storage }).single(file);
    } else {
        console.log("file not Added");
        next();
    }
}

const visaUpload = (file, next) => {
    if (file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/visa')
            },
            filename: function (req, file, cb) {
                console.log("middelware file:", file)
                cb(null, file.fieldname + '_' + Date.now())
            }
        })
        return multer({ storage: storage }).single(file);
    } else {
        console.log("file not Added");
        next();
    }
}

const passportUpload = (file, next) => {
    if (file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/passport')
            },
            filename: function (req, file, cb) {
                console.log("middelware file:", file)
                cb(null, file.fieldname + '_' + Date.now())
            }
        })
        return multer({ storage: storage }).single(file);
    } else {
        console.log("file not Added");
        next();
    }
}

const ticketUpload = (file, next) => {
    if (file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/tickets')
            },
            filename: function (req, file, cb) {
                console.log("middelware file:", file)
                cb(null, file.fieldname + '_' + Date.now())
            }
        })
        return multer({ storage: storage }).single(file);
    } else {
        console.log("file not Added");
        next();
    }
}

const voucherUpload = (file, next) => {
    if (file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/vouchers')
            },
            filename: function (req, file, cb) {
                console.log("middelware file:", file)
                cb(null, file.fieldname + '_' + Date.now())
            }
        })
        return multer({ storage: storage }).single(file);
    } else {
        console.log("file not Added");
        next();
    }
}

module.exports = {
    upload: upload,
    passportUpload: passportUpload,
    visaUpload: visaUpload,
    ticketUpload: ticketUpload,
    voucherUpload: voucherUpload
}