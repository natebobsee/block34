require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();

const path = require('path');
// GET - / - returns homepage
//server.get('/', (req, res) => {
    
    // serve up the public folder as static index.html file
   //  res.sendFile(__dirname + '/public/index.html');
//});
// server.use('/api', require('./api'));
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, './frontend/dist')))
const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});