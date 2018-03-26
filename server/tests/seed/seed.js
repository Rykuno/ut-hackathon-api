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
  text: 'Mac or PC',
  answers: ['Mac'],
  order: 1,
  section: 1,
  weight: 1,
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'What color is blue?',
  weight: 1,
  order: 1,
  answers: ["Blue"],
  section: 1,
  _creator: userTwoId
},{
  _id: new ObjectID(),
  text: 'Spaces or Tabs',
  answers: ['Tabs'],
  order: 2,
  section: 1,
  weight: 1,
  _creator: userOneId
},
{
  _id: new ObjectID(),
  text: 'What is 8 + 4?',
  answers: ['12'],
  order: 1,
  section: 2,
  weight: 1,
  _creator: userOneId
}
];

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
