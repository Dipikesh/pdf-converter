const express = require('express');
const app = express();
const multer = express('multer');
const morgan = require('morgan');
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
// const cors = require('cors');

express.static(path.join(__dirname, '/public'));

const routes = require('./routes.js');
// app.use(static);

app.use('/', routes);
// process.kill(process.pid);
app.use(async (req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(4000,()=> {
  console.log("Listening on port 4000");
})

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('error', () => {
  console.log("Asd");
  process.exit(1);
})


