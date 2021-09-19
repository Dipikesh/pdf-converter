const router = require('express')();
const { convController, getPdfController, staticController,favController} = require('./controller/conv.controller');
const { imageUpload } = require('./middleware/imageFunc');
const path = require('path');
let staticPath = path.join(__dirname, './')






router.get('/favicon.ico', favController);
router.get('/', (req, res) => {
    res.sendFile(staticPath+'public/home.html');
});

router.post('/convert', imageUpload.array('image', 20),convController);

//     (req, res) => {
//     res.send("okay")
// },
//     (err, req, res, next) => {
//         next(err);
// });


router.get('/pdf', getPdfController);
router.get('/public', staticController);


module.exports = router;
