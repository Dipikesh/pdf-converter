const express = require('express');
const app = express();
const multer = express('multer');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors')

app.use(cors());
app.use(compression());
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()
const path = require('path');





const routes = require('./routes.js');

express.static(path.join(__dirname, '/public'));

app.use('/', routes);

// process.kill(process.pid);
app.use( (req, res, next) => {
  res.status(404).send("Not found");
});
app.use((err, req, res, next)=> {
  console.log("Errrrrr", err);
  res.status(400);
  res.send(err.message);
});
const port = process.env.PORT ||8000;
app.listen(port,()=> {
  console.log("Listening on port ",port);
})
//asdf/


process.on('UncaughtException', (err) => {
  console.log("UncaughtException"+err);
  process.exit(1);
})


