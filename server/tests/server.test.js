const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Question} = require('./../models/question');
const {User} = require('./../models/user');
const {questions, populateQuestions, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateQuestions);

describe('POST /questions', () => {
  it('should create a new question', (done) => {
    var text = 'Team1 Test Question';

    request(app)
      .post('/questions')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find({text}).then((questions) => {
          expect(questions.length).toBe(1);
          expect(questions[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create question with invalid body data', (done) => {
    request(app)
      .post('/questions')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find().then((questions) => {
          expect(questions.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /questions', () => {
  it('should get all questions', (done) => {
    request(app)
      .get('/questions')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.questions.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /questions/:id', () => {
  it('should return question doc', (done) => {
    request(app)
      .get(`/questions/${questions[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.question.text).toBe(questions[0].text);
      })
      .end(done);
  });

  it('should not return question doc created by other user', (done) => {
    request(app)
      .get(`/questions/${questions[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if question not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/questions/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/questions/123abc')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /questions/:id', () => {
  it('should remove a question', (done) => {
    var hexId = questions[1]._id.toHexString();

    request(app)
      .delete(`/questions/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.question._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.findById(hexId).then((question) => {
          expect(question).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should remove a question', (done) => {
    var hexId = questions[0]._id.toHexString();

    request(app)
      .delete(`/questions/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.findById(hexId).then((question) => {
          expect(question).toExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if question not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/questions/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/questions/123abc')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /questions/:id', () => {
  it('should update the question', (done) => {
    var hexId = questions[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/questions/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.question.text).toBe(text);
        expect(res.body.question.completed).toBe(true);
        expect(res.body.question.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should not update the question created by other user', (done) => {
    var hexId = questions[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/questions/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: true,
        text
      })
      .expect(404)
      .end(done);
  });

  it('should clear completedAt when question is not completed', (done) => {
    var hexId = questions[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      .patch(`/questions/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.question.text).toBe(text);
        expect(res.body.question.completed).toBe(false);
        expect(res.body.question.completedAt).toNotExist();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123mnb!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'and',
        password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /users/me/login', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/login')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
