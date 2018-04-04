const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Question } = require('./../../models/question');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const userFourId = new ObjectID();
const userFiveId = new ObjectID();

const users = [
  {
    _id: userOneId,
    username: 'team1',
    password: 'password',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    username: 'team2',
    password: 'password',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userThreeId,
    username: 'team3',
    password: 'password',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userThreeId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userFourId,
    username: 'team4',
    password: 'password',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userFourId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userFiveId,
    username: 'team5',
    password: 'password',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userFiveId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  }
];

let questions = [];

for (user in users) {
  let testQuestions = [
    // {
    //   _id: new ObjectID(),
    //   text: 'Mac or PC',
    //   answers: ['Mac'],
    //   order: 1,
    //   section: 1,
    //   team: +user + 1,
    //   weight: 1,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'Spaces or Tabs',
    //   answers: ['Tabs'],
    //   order: 2,
    //   section: 1,
    //   team: +user + 1,
    //   weight: 2,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'What is 8 + 4?',
    //   answers: ['12'],
    //   order: 1,
    //   section: 2,
    //   weight: 1,
    //   team: +user + 1,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'What is 1+1',
    //   answers: ['2'],
    //   order: 3,
    //   team: +user + 1,
    //   section: 1,
    //   weight: 3,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'What is 1+2',
    //   answers: ['3'],
    //   order: 4,
    //   team: +user + 1,
    //   section: 1,
    //   weight: 4,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'What is 1+2',
    //   answers: ['3'],
    //   order: 1,
    //   team: +user + 1,
    //   section: 3,
    //   weight: 1,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'What is 1+2',
    //   answers: ['3'],
    //   order: 1,
    //   team: +user + 1,
    //   section: 4,
    //   weight: 1,
    //   _creator: users[user]._id
    // },
    // {
    //   _id: new ObjectID(),
    //   text: 'What is 1+2',
    //   answers: ['3'],
    //   order: 1,
    //   team: +user + 1,
    //   section: 5,
    //   weight: 1,
    //   _creator: users[user]._id
    // }

    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this server? ie 10.0.X.__',
      answers: ['2'],
      order: 1,
      section: 1,
      team: +user + 1,
      weight: 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 80?',
      answers: ['http'],
      order: 2,
      section: 1,
      team: +user + 1,
      weight: 2,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 22?',
      answers: ['ssh'],
      order: 3,
      section: 1,
      team: +user + 1,
      weight: 2,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this server? ie 10.0.X.__',
      answers: ['3'],
      order: 1,
      section: 2,
      team: +user + 1,
      weight: 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this server? ie 10.0.X.__',
      answers: ['4'],
      order: 1,
      section: 3,
      team: +user + 1,
      weight: 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this server? ie 10.0.X.__',
      answers: ['5'],
      order: 1,
      section: 4,
      team: +user + 1,
      weight: 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What 1+!',
      answers: ['2'],
      order: 1,
      section: 5,
      team: +user + 1,
      weight: 1,
      _creator: users[user]._id
    }
  ];

  questions.push(testQuestions);
}

const populateQuestions = done => {
  Question.remove({})
    .then(() => {
      for (let i = 0; i < 5; i++) {
        Question.insertMany(questions[i]);
      }
      return;
    })
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
      var userThree = new User(users[2]).save();
      var userFour = new User(users[3]).save();
      var userFive = new User(users[4]).save();
      return Promise.all([userOne, userTwo, userThree, userFour, userFive]);
    })
    .then(() => done());
};

module.exports = { questions, populateQuestions, users, populateUsers };
