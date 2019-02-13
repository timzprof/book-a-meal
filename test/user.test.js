import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import User from '../api/models/user';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

before(done => {
  app.on('dbConnected', () => {
    done();
  });
});

describe('User Auth Endpoints', () => {
  it('POST /auth/signup - User SignUp Validation Test(Required)', done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        name: 'Roger Test',
        email: 'roger@test.com',
        phone: '08028372825'
      })
      .then(async res => {
        try {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, 'error');
          assert.equal(res.body.type, 'validation');
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /auth/signup', err.message));
  });
  it('POST /auth/signup - User SignUp Validation Test(Email)', done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        name: 'Roger Test',
        email: 'roger',
        phone: '08028372825',
        password: 'pass'
      })
      .then(async res => {
        try {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, 'error');
          assert.equal(res.body.type, 'validation');
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /auth/signup', err.message));
  });
  it('POST /auth/signup - User Can Sign Up', done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        name: 'Roger Test',
        email: 'roger@test.com',
        phone: '08028372825',
        password: 'password'
      })
      .then(async res => {
        try {
          expect(res).to.have.status(201);
          assert.equal(res.body.status, 'success');
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /auth/signup', err.message));
  });
  it("POST /auth/signup - User Can't signup again with the same email", done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        name: 'Roger Test',
        email: 'roger@test.com',
        phone: '08028372825',
        password: 'password'
      })
      .then(async res => {
        try {
          expect(res).to.have.status(500);
          assert.equal(res.body.status, 'error');
          const user = await User.findOne({ where: { email: 'roger@test.com' } });
          await user.destroy();
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /auth/signup', err.message));
  });
});
