require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Question} = require('./models/question');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', '10.0.1.1:3001', '10.0.2.1:3001', '10.0.3.1:3001', '10.0.4.1:3001', '10.0.5.1:3001'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-auth');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const questionsRouter = require('./routes/question').router
app.use('/questions', questionsRouter);

const usersRouter = require('./routes/user').router;
app.use('/users', usersRouter);

const statisticsRouter = require('./routes/statistics').router;
app.use('/statistics', statisticsRouter);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
