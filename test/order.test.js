import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import secret from '../api/util/jwt_secret';
import User from '../api/models/user';
import Caterer from '../api/models/caterer';
import Order from '../api/models/orders';
import Meal from '../api/models/meals';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const userPayload = {
  name: 'Bruce Wayne',
  email: 'bruce@batman.com',
  phone: '07075748392',
  password: 'waynemanor'
};

const catererPayload = {
  name: 'Joffery Baratheon',
  email: 'jof@sppiledbrat.com',
  phone: '07075748391',
  catering_service: 'Iron Throne Eats',
  password: 'oursisthefury'
};

describe('Caterer Get all Orders Endpoint Tests', () => {
  it(`GET ${API_PREFIX}/orders - Fetch All Orders (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/orders`)
      .then(res => {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, 'error');
        done();
      })
      .catch(err => console.log('GET /orders', err.message));
  });
  it(`GET ${API_PREFIX}/orders - Fetch All Orders - (Normal User Unauthorized)`, done => {
    User.create(userPayload).then(user => {
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
        .get(`${API_PREFIX}/orders`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(401);
          assert.equal(res.body.status, 'error');
          User.destroy({ where: { id: user.id } }).then(() => {
            done();
          });
        })
        .catch(err => console.log('GET /orders', err.message));
    });
  });
  it(`GET ${API_PREFIX}/orders - Fetch All Orders - (Caterer Authorized)`, done => {
    Caterer.create(catererPayload)
      .then(caterer => {
        const { id, name, email, phone } = caterer;
        const token = jwt.sign(
          {
            caterer: { id, name, email, phone },
            isCaterer: true
          },
          secret,
          {
            expiresIn: 86400
          }
        );
        chai
          .request(app)
          .get(`${API_PREFIX}/orders`)
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            Caterer.destroy({ where: { id: caterer.id } }).then(() => {
              done();
            });
          })
          .catch(err => console.log('GET /orders', err.message));
      })
      .catch(err => console.log(err.errors));
  });
});

describe('User can add to Orders Endpoint Tests', () => {
  Caterer.create(catererPayload)
    .then(caterer => {
      return Meal.create({
        name: 'Dummy Meal',
        price: 500,
        imageUrl: 'fk.png',
        catererId: caterer.id
      });
    })
    .then(meal => {
      it(`POST ${API_PREFIX}/orders - Add To Orders (Unauthorized)`, done => {
        chai
          .request(app)
          .post(`${API_PREFIX}/orders`)
          .send({
            mealId: meal.id,
            quantity: 1
          })
          .then(res => {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, 'error');
            done();
          })
          .catch(err => console.log('POST /orders', err.message));
      });
      it(`POST ${API_PREFIX}/orders - Add To Orders - (Validation Test)`, done => {
        User.create(userPayload).then(user => {
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
            .post(`${API_PREFIX}/orders`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId: meal.id
            })
            .then(res => {
              expect(res).to.have.status(400);
              assert.equal(res.body.status, 'error');
              done();
            })
            .catch(err => console.log('POST /orders', err.message));
        });
      });
      it(`POST ${API_PREFIX}/orders - Add To Orders - (User can Add to Order)`, done => {
        User.findOne({ where: { email: 'bruce@batman.com' } }).then(user => {
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
            .post(`${API_PREFIX}/orders`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId: meal.id,
              quantity: 1
            })
            .then(res => {
              expect(res).to.have.status(200);
              assert.equal(res.body.status, 'success');
              done();
            })
            .catch(err => console.log('POST /orders', err.message));
        });
      });
      it(`POST ${API_PREFIX}/orders - Add To Orders - (User Cannot increament Order Item quantity from this route)`, done => {
        User.findOne({ where: { email: 'bruce@batman.com' } }).then(user => {
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
            .post(`${API_PREFIX}/orders`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              mealId: meal.id,
              quantity: 1
            })
            .then(res => {
              expect(res).to.have.status(200);
              assert.equal(res.body.status, 'warning');
              Meal.destroy({ where: { id: meal.id } })
                .then(() => {
                  return User.destroy({ where: { id: user.id } });
                })
                .then(() => {
                  return Caterer.destroy({ where: { email: 'jof@sppiledbrat.com' } });
                })
                .then(() => {
                  done();
                });
            })
            .catch(err => console.log('POST /orders', err.message));
        });
      });
    });
});
