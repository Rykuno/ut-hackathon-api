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
      text: 'What is the last quadrant of the IP for this server? (X.X.X.__)',
      answers: ['2'],
      order: 1,
      section: 1,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 80?',
      answers: ['http'],
      order: 2,
      section: 1,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 135?',
      answers: ['msrpc'],
      order: 3,
      section: 1,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 139?',
      answers: ['netbios-ssn'],
      order: 4,
      section: 1,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the name of this machine(all caps)? hint: Samba',
      answers: ['windos_xp'],
      order: 5,
      section: 1,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'The root directory contains Secret.txt. What is the secret code?',
      answers: ['4smqe6h6ed'],
      order: 6,
      section: 1,
      weight: 8,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text:
        'What is the last quadrant of the IP for the Grandstream device? ie X.X.X.__',
      answers: ['35'],
      order: 1,
      section: 5,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 80 of the Grandstream device?',
      answers: ['http'],
      order: 2,
      section: 5,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the username for the VoIP phone(Grandstream)?',
      answers: ['admin'],
      order: 3,
      section: 5,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the VoIP phone(Grandstream)?',
      answers: ['admin'],
      order: 4,
      section: 5,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text:
        'There is a secret code hidden in the contacts area. What is the secret code?',
      answers: ['qbfgv4pu9c'],
      order: 5,
      section: 5,
      weight: 4,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text:
        'Can you read our email? If so, what secret code is in bhsupport@capstone.com?',
      answers: ['wf9k7sy3mw'],
      order: 6,
      section: 5,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text:
        'Can you read our email? If so, what secret code is in androidtest@capstone.com?',
      answers: ['8g44mnspuq'],
      order: 7,
      section: 5,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'If you gained root access in the prelims, enter your code here.',
      answers: ['muqwf85cgd'],
      order: 8,
      section: 5,
      weight: 5,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text:
        'Secret.txt is stored in a shared network folder. What is the secret code?',
      answers: ['qfxdxxkg2n'],
      order: 9,
      section: 5,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text:
        'If you get root access to the Windows XP machine take a screen shot and enter the secret code here.',
      answers: ['7gmyjq2gjw'],
      order: 10,
      section: 5,
      weight: 6,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this server? ie 10.0.X.__',
      answers: ['4'],
      order: 1,
      section: 3,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 80?',
      answers: ['http'],
      order: 2,
      section: 3,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 27?',
      answers: ['ssh'],
      order: 3,
      section: 3,
      weight: 2,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the cookie user/level?',
      answers: ['cookie'],
      order: 4,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the chocolate user/level?',
      answers: ['3UKYFrGZ7b5M', '3ukyfrgz7b5m'],
      order: 5,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the almond user/level?',
      answers: ['jGd3eqFgUGu7', 'jgd3eqfgugu7'],
      order: 6,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the sugar user/level?',
      answers: ['q25EUXnm96Yu', 'q25euxnm96yu'],
      order: 7,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the butter user/level?',
      answers: ['CLhPy38yfP5N', 'clhpy38yfp5n'],
      order: 8,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the macaroon user/level?',
      answers: ['Password', 'password'],
      order: 9,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the fortune user/level?',
      answers: ['VsJVzZrYr7Sq', 'vsjvzzryr7sq'],
      order: 10,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the fudge user/level?',
      answers: ['ByQCAMLfR3SS', 'byqcamlfr3ss'],
      order: 11,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the gingerbread user/level?',
      answers: ['8eUFyPfvVBk2', '8eufypfvvbk2'],
      order: 12,
      section: 3,
      weight: 3,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the password for the root user?',
      answers: ['motherbrain'],
      order: 13,
      section: 3,
      weight: 10,
      team: +user + 1,
      _creator: users[user]._id
    },

    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this server? ie 10.0.X.__',
      answers: ['3'],
      order: 1,
      section: 2,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 80?',
      answers: ['http'],
      order: 2,
      section: 2,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'The trophy code for cracking a users PIN:',
      answers: ['fh6e4fjs'],
      order: 3,
      section: 2,
      weight: 4,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'The trophy code for cracking a users Password:',
      answers: ['vrdmt3rc'],
      order: 4,
      section: 2,
      weight: 4,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'The trophy code for launching a BGM-109 Tomahawk missile:',
      answers: ['9ikqvfx0'],
      order: 5,
      section: 2,
      weight: 4,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'The secret code in SecretCode.txt on the Desktop:',
      answers: ['r7kler57hs'],
      order: 6,
      section: 2,
      weight: 4,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What is the last quadrant of the IP for this device? (X.X.X.__)',
      answers: ['5'],
      order: 1,
      section: 4,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'What service is running on port 8080?',
      answers: ['http'],
      order: 2,
      section: 4,
      weight: 1,
      team: +user + 1,
      _creator: users[user]._id
    },
    {
      _id: new ObjectID(),
      text: 'The root directory contains /sdcard/Secret.txt. What is the secret code?',
      answers: ['d4ey9ebnqm'],
      order: 3,
      section: 4,
      weight: 8,
      team: +user + 1,
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
