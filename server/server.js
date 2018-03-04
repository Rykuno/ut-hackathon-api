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


const questionsRouter = require('./routes/question').router
app.use('/questions', questionsRouter);

const usersRouter = require('./routes/user').router;
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
