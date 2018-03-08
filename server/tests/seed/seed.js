const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Question} = require('./../../models/question');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  username: 'team1',
  password: 'password',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  username: 'team2',
  password: 'password',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const questions = [{
  _id: new ObjectID(),
  text: 'Team 1 Test Question',
  weight: 1,
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Team 2 Test Question',
  weight: 1,
  completed: true,
  completedAt: 1337,
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
