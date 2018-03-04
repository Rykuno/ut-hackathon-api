const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Question} = require('./../../models/question');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  username: 'donny',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  username: 'juri',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const questions = [{
  _id: new ObjectID(),
  text: 'First test question',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test question',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateQuestions = (done) => {
  Question.remove({}).then(() => {
    return Question.insertMany(questions);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {questions, populateQuestions, users, populateUsers};
