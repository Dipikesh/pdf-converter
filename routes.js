const router = require('express')();
const { convController, getPdfController, staticController,favController} = require('./controller/conv.controller');
const { imageUpload } = require('./middleware/imageFunc');
const path = require('path');
let staticPath = path.join(__dirname, './')






// router.get('/favicon.ico', favController);
router.get('/', (req, res) => {
    res.sendFile(staticPath+'public/home.html');
});

router.post('/convert', imageUpload.array('file', 20),convController);




router.get('/pdf', getPdfController);
router.get('/public', staticController);


module.exports = router;
