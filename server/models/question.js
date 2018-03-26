const mongoose = require('mongoose');

let Question = mongoose.model('Question', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  weight: {
    type: Number,
    required: false,
    default: 1
  },
  answers: {
    type: Array,
    required: true
  },
  userAnswer: {
    type: String,
    default: ""
  },
  order: {
    type: Number,
    required: true
  },
  previousAnswerAttempts: {
    type: Array,
    default: []
  },
  numberOfAttempts: {
    type: Number,
    default: 0
  },
  section: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Question};
