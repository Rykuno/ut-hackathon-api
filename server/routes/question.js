const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { Question } = require('../models/question');
const { mongoose } = require('mongoose');
const _ = require('lodash');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({
    message: 'Working'
  });
});

router.post('/', authenticate, (req, res) => {
  var quest = new Question({
    text: req.body.text,
    _creator: req.user._id
  }, 'completed team completedAt order section text numberOfAttempts weight');

  quest.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

router.get('/', authenticate, (req, res) => {
  Question.find({
    _creator: req.user._id
  }, '_id text order section team completedAt numberOfAttempts weight completed').then(
    Questions => {
      res.send({ Questions });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

router.post('/check/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['answer']);
  console.log(body);
  

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findOne({ _id: id }).then(question => {
    const { answers, completed } = question;
    const { answer, user } = body;
    console.log(completed);

    if (completed) {
      res.status(200).send({ message: 'Quesiton already answered.' });
      return;
    }

    if (answers.includes(answer.trim().toLowerCase())) {
      Question.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            completed: true,
            completedAt: Date.now(),
            userAnswer: answer,
            user: user
          },
          $inc: { numberOfAttempts: 1 }
        },
        { new: true }
      )
        .then(Question => {
          if (!Question) {
            return res.status(404).send();
          }
          res.send({ correct: true });
        })
        .catch(e => {
          res.status(400).send({ message: e });
        });
    } else {
      Question.findOneAndUpdate(
        { _id: id },
        {
          $inc: { numberOfAttempts: 1 },
          $push: { previousAnswerAttempts: answer }
        },
        { new: true }
      )
        .then(Question => {
          if (!Question) {
            return res.status(404).send();
          }

          res.send({ corect: false });
        })
        .catch(e => {
          res.status(400).send({ message: e });
        });
    }
  });
});

module.exports = { router };
