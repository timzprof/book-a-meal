import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import Caterer from '../api/models/caterer';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

before(done => {
  app.on('dbConnected', () => {
    done();
  });
});

describe('Caterer Auth Endpoints', () => {
  it('POST /auth/caterer/signup - Caterer SignUp Validation Test', done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/caterer/signup`)
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
      .catch(err => console.log('POST /auth/caterer/signup', err.message));
  });
  it('POST /auth/caterer/signup - Caterer Can Sign Up', done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/caterer/signup`)
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
      .catch(err => console.log('POST /auth/caterer/signup', err.message));
  });
  it("POST /auth/caterer/signup - Caterer Can't signup again with the same email", done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/caterer/signup`)
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
          const caterer = await Caterer.findOne({ where: { email: 'roger@test.com' } });
          await caterer.destroy();
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /auth/caterer/signup', err.message));
  });
  // it('POST /auth/login - User Login Validation Test(Required)', done => {
  //   chai
  //     .request(app)
  //     .post(`${API_PREFIX}/auth/login`)
  //     .send({
  //       email: 'roger@test.com'
  //     })
  //     .then(async res => {
  //       try {
  //         expect(res).to.have.status(400);
  //         assert.equal(res.body.status, 'error');
  //         assert.equal(res.body.type, 'validation');
  //         done();
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     })
  //     .catch(err => console.log('POST /auth/login', err.message));
  // });
  // it('POST /auth/login - User Login Validation Test(Email)', done => {
  //   chai
  //     .request(app)
  //     .post(`${API_PREFIX}/auth/login`)
  //     .send({
  //       email: 'roger',
  //       password: 'password'
  //     })
  //     .then(async res => {
  //       try {
  //         expect(res).to.have.status(400);
  //         assert.equal(res.body.status, 'error');
  //         assert.equal(res.body.type, 'validation');
  //         done();
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     })
  //     .catch(err => console.log('POST /auth/login', err.message));
  // });
  // it('POST /auth/login - User Can Login', done => {
  //   chai
  //     .request(app)
  //     .post(`${API_PREFIX}/auth/login`)
  //     .send({
  //       email: 'roger@test.com',
  //       password: 'password'
  //     })
  //     .then(async res => {
  //       try {
  //         expect(res).to.have.status(200);
  //         assert.equal(res.body.status, 'success');
  //         done();
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     })
  //     .catch(err => console.log('POST /auth/login', err.message));
  // });
  // it("POST /auth/login - User Can't login with incorrect password", done => {
  //   chai
  //     .request(app)
  //     .post(`${API_PREFIX}/auth/login`)
  //     .send({
  //       email: 'roger@test.com',
  //       password: 'password111'
  //     })
  //     .then(async res => {
  //       try {
  //         expect(res).to.have.status(500);
  //         assert.equal(res.body.status, 'error');
  //         const user = await User.findOne({ where: { email: 'roger@test.com' } });
  //         await user.destroy();
  //         done();
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     })
  //     .catch(err => console.log('POST /auth/login', err.message));
  // });
});
