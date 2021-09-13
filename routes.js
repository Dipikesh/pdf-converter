const router = require('express')();
const { convController, getPdfController, staticController,} = require('./controller/conv.controller');
const { imageUpload } = require('./middleware/imageFunc');
const path = require('path');
let staticPath = path.join(__dirname, './')







router.get('/', (req, res) => {
    res.sendFile(staticPath+'public/home.html');
});

router.post('/convert', imageUpload.single('image'), convController);
router.get('/pdf', getPdfController);
router.get('/public', staticController);


module.exports = router;