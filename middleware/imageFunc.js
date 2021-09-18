const multer = require('multer');
const {imageStorage} = require('../services/conv.services');

module.exports.imageUpload  =
    multer({
        storage: imageStorage,
        limits: {
		fileSize: 5000000 // 1000000 Bytes = 1 MB
        },
        fileFilter(req, file, cb) {
           
            if (!file.originalname.match(/\.(png|jpg)$/)) {
                // upload only png and jpg format
                return cb(new Error('Please upload a Image'))
            }
            cb(undefined, true)
        }
    })
  

