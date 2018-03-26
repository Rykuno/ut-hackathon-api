const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { User } = require('../models/user');
const { mongoose } = require("mongoose");
const _ = require('lodash');
const ObjectID = require("mongodb").ObjectID;
const router = express.Router();

  // POST /users
  router.post('/', (req, res) => {
      var body = _.pick(req.body, ['username', 'password']);
      var user = new User(body);
    
      user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400).send(e);
      })
    });
    
  router.get('/me', authenticate, (req, res) => {
      res.send(req.user);
    });
  
  router.post('/login', (req, res) => {
    console.log(req.body);
    
    var body = _.pick(req.body, ['username', 'password']);
  
    User.findByCredentials(body.username, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send({
          user,
          token
        });
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });
  
  router.delete('/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send({message: "success"});
    }, () => {
      res.status(400).send({message: "failure"});
    });
  });


  module.exports = { router };