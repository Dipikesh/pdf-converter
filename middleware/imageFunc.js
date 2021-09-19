
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
           
            if (!file.originalname.match(/\.(png|jpg)$/)) {
                // upload only png and jpg format
                
                return cb(createError.BadRequest('Please upload a Image'))
                // res.status(400).json({message: 'Please upload a Image'})
            }
            cb(undefined, true)
        }
    })
  