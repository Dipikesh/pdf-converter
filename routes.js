const router = require('express')();
const { convController, getPdfController, staticController,} = require('./controller/conv.controller');
const { imageUpload } = require('./middleware/imageFunc');
const path = require('path');
let staticPath = path.join(__dirname, './')







router.get('/', (req, res) => {
    res.sendFile(staticPath+'public/home.html');
});

// imageUpload.single('image')
router.post('/convert', imageUpload.array('image', 4), convController);
// router.post('/convert', (req, res) => {
//     console.log("res file ",req);
// });

router.get('/pdf', getPdfController);
router.get('/public', staticController);


module.exports = router;