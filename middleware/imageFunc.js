
const multer = require('multer');
const { imageStorage } = require('../services/conv.services');
const createError = require('http-errors');

module.exports.imageUpload  =
    multer({
        storage: imageStorage,
        limits: {
		fileSize: 5000000 // 1000000 Bytes = 1 MB
        },
        fileFilter(req, file, cb) {
           
            if (!file.mimeType === 'image/jpeg'|| !file.mimeType === 'image/png' || !file.mimeType === 'image/jpg') {
                // upload only png and jpg format
                console.log('upload only png and jpg format',file);
                return cb(createError.BadRequest('Please upload a Image'))
                // res.status(400).json({message: 'Please upload a Image'})
            }
            console.log("file properties middleware ", file);
  
            cb(undefined, true)
        }
    })
  