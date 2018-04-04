const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { Question } = require('../models/question');
const { mongoose } = require('mongoose');
const _ = require('lodash');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).send('Success');
});

const getStatistics = Questions => {
  const teams = ['team1', 'team2', 'team3', 'team4', 'team5'];
  const json = [];
  for (team in teams) {
    const questionsForTeam = Questions.filter(obj => obj.team === +team + 1);
    if (questionsForTeam) {
      const jsonForTeam = returnStatisticsForTeam(questionsForTeam, team);
      const key = teams[team];
      const obj = {
        [key]: jsonForTeam
      };
      json.push(obj);
    }
  }
  const stats = { stats: json };
  return stats;
};

const returnStatisticsForTeam = (Questions, team) => {
  let json = [];
  const sections = [
    'SectionOne',
    'SectionTwo',
    'SectionThree',
    'SectionFour',
    'SectionFive'
  ];
  for (section in sections) {
    const sectionWeight = Questions.filter(
      obj => obj.section === +section + 1 && obj.completed === true
    ).reduce((accumulator, value) => {
      return accumulator + value.weight;
    }, 0);
    const sectionWeightTotal = Questions.filter(
      obj => obj.section === +section + 1
    ).reduce((accumulator, value) => {
      return accumulator + value.weight;
    }, 0);
    const totalWeight = Questions.reduce((accumulator, value) => {
      return accumulator + value.weight;
    }, 0);

    const sectionCorrect = Questions.filter(
      obj => obj.section === +section + 1 && obj.completed === true
    ).length;
    const sectionLength = Questions.filter(obj => obj.section === +section + 1)
      .length;
    const key = sections[section];
    const obj = {
      section: {
        correct: sectionCorrect,
        total: sectionLength,
        overallTotal: Questions.length,
        weight: sectionWeight,
        sectionWeight: sectionWeightTotal,
        totalWeight: totalWeight
      }
    };
    json.push(obj);
  }
  return json;
};

const getTotalWrongAnswers = Questions => {
  const teams = ['team1', 'team2', 'team3', 'team4', 'team5'];
  const json = [];

  for (team in teams) {
    const questionsForTeam = Questions.filter(obj => obj.team === +team + 1);
    const totalIncorrectForTeam = questionsForTeam.reduce(
      (accumulator, value) => {
        return accumulator + value.numberOfAttempts;
      },
      0
    );
    const key = teams[team];
    const obj = {
      [key]: totalIncorrectForTeam
    };
    json.push(obj);
  }
  return json;
};

router.get('/firstCompleted', (req, res) => {
  Question.find({ completedAt: { $exists: true, $ne: null } })
    .sort('completedAt')
    .then(questions => {
      if (questions) {
        const { team, completedAt } = questions[0];
        const dateToLocal = new Date(completedAt);
        res.send({
          firstCompletedTeam: team,
          completedAt: dateToLocal
        });
      }
    });
});

router.get('/progress', (req, res) => {
  Question.find(
    req.query,
    'completed team completedAt order section text numberOfAttempts weight'
  ).then(
    Questions => {
      res.json(getStatistics(Questions));
    },
    e => {
      res.status(400).send(e);
    }
  );
});

router.get('/numberOfAttempts', (req, res) => {
  Question.find({}, 'numberOfAttempts team completed completedAt')
    .then(Questions => {
      const obj = {
        totalIncorrect: getTotalWrongAnswers(Questions)
      };
      res.json(obj);
    })
    .catch();
});

module.exports = {
  router
};
