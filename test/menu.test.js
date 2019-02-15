import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import secret from '../api/util/jwt_secret';
import User from '../api/models/user';
import Caterer from '../api/models/caterer';
import Meal from '../api/models/meals';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

describe('User Get all Menus Endpoint Tests', () => {
  it(`GET ${API_PREFIX}/menu/ - Fetch All Menus (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/menu/`)
      .then(async res => {
        try {
          expect(res).to.have.status(401);
          assert.equal(res.body.status, 'error');
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('GET /menu/', err.message));
  });
  it(`GET ${API_PREFIX}/menu/ - Fetch All Menus - (User Authorized)`, done => {
    User.create({
      name: 'Jon Snow',
      email: 'bastard@stark.com',
      phone: '09019272712',
      password: 'winterishere'
    }).then(user => {
      const { id, name, email, phone } = user;
      const token = jwt.sign(
        {
          user: { id, name, email, phone }
        },
        secret,
        {
          expiresIn: 86400
        }
      );
      chai
        .request(app)
        .get(`${API_PREFIX}/menu/`)
        .set('Authorization', `Bearer ${token}`)
        .then(async res => {
          try {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            const authUser = await User.findOne({ where: { email: 'bastard@stark.com' } });
            await authUser.destroy();
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('GET /menu/', err.message));
    });
  });
});

describe('Caterer Add Meal To Menu Endpoint Tests', () => {
  Caterer.create({
    name: 'Arya Stark',
    email: 'agirl@hasnoface.com',
    phone: '00000000000',
    password: 'bellish:)'
  })
    .then(caterer => {
      return Meal.create({
        name: 'Fake Food',
        price: 700,
        imageUrl: 'img.png',
        catererId: caterer.id
      });
    })
    .then(meal => {
      const mealId = meal.id;
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu(Unauthorized)`, done => {
        chai
          .request(app)
          .post(`${API_PREFIX}/menu/`)
          .send({
            mealId,
            quantity: 2
          })
          .then(async res => {
            try {
              expect(res).to.have.status(401);
              assert.equal(res.body.status, 'error');
              done();
            } catch (err) {
              console.log(err.message);
            }
          })
          .catch(err => console.log('POST /menu/', err.message));
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Normal User Unauthorized)`, done => {
        User.create({
          name: 'Lord Bellish',
          email: 'billy@vale.com',
          phone: '01075748362',
          password: 'sansapupeteer'
        }).then(user => {
          const { id, name, email, phone } = user;
          const token = jwt.sign(
            {
              user: { id, name, email, phone }
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .post(`${API_PREFIX}/menu/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId,
              quantity: 2
            })
            .then(async res => {
              try {
                expect(res).to.have.status(401);
                assert.equal(res.body.status, 'error');
                await User.destroy({ where: { email: 'billy@vale.com' } });
                done();
              } catch (err) {
                console.log(err.message);
              }
            })
            .catch(err => console.log('POST /menu/', err.message));
        });
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Validation Test)`, done => {
        Caterer.findOne({ where: { email: 'agirl@hasnoface.com' } }).then(caterer => {
          const token = jwt.sign(
            {
              caterer: {
                id: caterer.id,
                name: caterer.name,
                email: caterer.email,
                phone: caterer.phone
              },
              isCaterer: true
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .post(`${API_PREFIX}/menu/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId
            })
            .then(async res => {
              try {
                expect(res).to.have.status(400);
                assert.equal(res.body.status, 'error');
                done();
              } catch (err) {
                console.log(err.message);
              }
            })
            .catch(err => console.log('POST /menu/', err.message));
        });
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Caterer Can Add Menu Meal)`, done => {
        Caterer.findOne({ where: { email: 'agirl@hasnoface.com' } }).then(caterer => {
          const token = jwt.sign(
            {
              caterer: {
                id: caterer.id,
                name: caterer.name,
                email: caterer.email,
                phone: caterer.phone
              },
              isCaterer: true
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .post(`${API_PREFIX}/menu/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId,
              quantity: 2
            })
            .then(async res => {
              try {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, 'success');
                done();
              } catch (err) {
                console.log(err.message);
              }
            })
            .catch(err => console.log('POST /menu/', err.message));
        });
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Caterer Can Update Menu Meal)`, done => {
        Caterer.findOne({ where: { email: 'agirl@hasnoface.com' } }).then(caterer => {
          const token = jwt.sign(
            {
              caterer: {
                id: caterer.id,
                name: caterer.name,
                email: caterer.email,
                phone: caterer.phone
              },
              isCaterer: true
            },
            secret,
            {
              expiresIn: 86400
            }
          );
          chai
            .request(app)
            .post(`${API_PREFIX}/menu/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId,
              quantity: 2
            })
            .then(async res => {
              try {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, 'success');
                assert.equal(res.body.data[0].quantity, 4);
                await Meal.destroy({ where: { id: mealId } });
                await Caterer.destroy({ where: { email: 'agirl@hasnoface.com' } });
                done();
              } catch (err) {
                console.log(err.message);
              }
            })
            .catch(err => console.log('POST /menu/', err.message));
        });
      });
    });
});
