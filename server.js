const express = require('express');
const app = express();
const multer = express('multer');
const morgan = require('morgan');
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()
const path = require('path');
const cors = require('cors');

express.static(path.join(__dirname, '/public'));

const routes = require('./routes.js');

// app.use(cors())
// app.use(static);

app.use('/', routes);
// process.kill(process.pid);
app.use(async (req, res, next) => {
  res.status(404).send("Not found");
});
const port = process.env.PORT ||4000;
app.listen(port,()=> {
  console.log("Listening on port ",port);
})

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('UncaughtException', (err) => {
  console.log("UncaughtException"+err);
  process.exit(1);
})


