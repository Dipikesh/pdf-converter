const express = require('express');
const app = express();
const helmet = require('helmet')
app.use(helmet());

const multer = express('multer');
const morgan = require('morgan');
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()
const path = require('path');





const routes = require('./routes.js');

express.static(path.join(__dirname, '/public'));

app.use('/', routes);

// process.kill(process.pid);
app.use(async (req, res, next) => {
  res.status(404).send("Not found");
});
const port = process.env.PORT ||4000;
app.listen(port,()=> {
  console.log("Listening on port ",port);
})



process.on('UncaughtException', (err) => {
  console.log("UncaughtException"+err);
  process.exit(1);
})


