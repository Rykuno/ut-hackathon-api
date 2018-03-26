const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { Question } = require('../models/question');
const { mongoose } = require('mongoose');
const _ = require('lodash');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

router.use((req, res, next) => {
  console.log('Hitting Quetion Endpoint');
  next();
});

router.get('/test', (req, res) => {
  res.send({
    message: 'Working'
  });
});

router.post('/', authenticate, (req, res) => {
  var quest = new Question({
    text: req.body.text,
    _creator: req.user._id
  });

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
  }).then(
    Questions => {
      res.send({ Questions });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

router.get('/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(Question => {
      if (!Question) {
        return res.status(404).send();
      }

      res.send({ Question });
    })
    .catch(e => {
      res.status(400).send();
    });
});

router.delete('/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(Question => {
      if (!Question) {
        return res.status(404).send();
      }

      res.send({ Question });
    })
    .catch(e => {
      res.status(400).send();
    });
});

router.patch('/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Question.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(Question => {
      if (!Question) {
        return res.status(404).send();
      }

      res.send({ Question });
    })
    .catch(e => {
      res.status(400).send();
    });
});

router.post('/check/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['answer']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findOne({ _id: id }).then(question => {
    const { answers } = question;
    const { answer } = body;
    if (answers.includes(body.answer)) {
      Question.findOneAndUpdate(
        { _id: id },
        {
          $set: { completed: true, completedAt: Date.now(), userAnswer: answer},
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
        { $inc: { numberOfAttempts: 1 } , $push: {previousAnswerAttempts: answer}},
        { new: true }
      )
        .then(Question => {
          if (!Question) {
            return res.status(404).send();
          }

          res.send({corect: false});
        })
        .catch(e => {
          res.status(400).send({message: e})
        });
    }
  });
});

module.exports = { router };
