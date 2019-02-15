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

describe('Caterer Get all Meals Endpoint Tests', () => {
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/meals/`)
      .then(async res => {
        try {
          expect(res).to.have.status(401);
          assert.equal(res.body.status, 'error');
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('GET /meals/', err.message));
  });
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals - (Normal User Unauthorized)`, done => {
    User.create({
      name: 'Billy Newton',
      email: 'billy@newton.com',
      phone: '07075748392',
      password: 'billions'
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
        .get(`${API_PREFIX}/meals/`)
        .set('Authorization', `Bearer ${token}`)
        .then(async res => {
          try {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, 'error');
            await User.destroy({ where: { email: 'billy@newton.com' } });
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('GET /meals/', err.message));
    });
  });
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals - (Caterer Authorized)`, done => {
    Caterer.create({
      name: 'Billy Newton',
      email: 'billy@newton.com',
      phone: '07075748392',
      password: 'billions'
    }).then(caterer => {
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
        .get(`${API_PREFIX}/meals/`)
        .set('Authorization', `Bearer ${token}`)
        .then(async res => {
          try {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            await Caterer.destroy({ where: { email: 'billy@newton.com' } });
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('GET /meals/', err.message));
    });
  });
});

describe('Caterer Add Meal Endpoint Tests', () => {
  it(`POST ${API_PREFIX}/meals/ - Add Meal Option (Unauthorized)`, done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/meals/`)
      .send({
        name: 'Test Meal',
        price: '500'
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
      .catch(err => console.log('POST /meals/', err.message));
  });
  it(`POST ${API_PREFIX}/meals/ - Add Meal Option - (Normal User Unauthorized)`, done => {
    User.create({
      name: 'Billy Newton',
      email: 'billy@newton.com',
      phone: '07075748392',
      password: 'billions'
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
        .post(`${API_PREFIX}/meals/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Meal',
          price: '500'
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
        .catch(err => console.log('POST /meals/', err.message));
    });
  });
  it(`POST ${API_PREFIX}/meals/ - Add Meal Option - (Validation Test)`, done => {
    Caterer.create({
      name: 'Billy Newton',
      email: 'billy@newton.com',
      phone: '07075748392',
      password: 'billions'
    }).then(caterer => {
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
        .post(`${API_PREFIX}/meals/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Meal',
          price: '500'
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
        .catch(err => console.log('POST /meals/', err.message));
    });
  });
  it(`POST ${API_PREFIX}/meals/ - Add Meal Option - (Caterer Can Add Meal Option)`, done => {
    Caterer.findOne({ where: { email: 'billy@newton.com' } }).then(caterer => {
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
        .post(`${API_PREFIX}/meals/`)
        .set('Authorization', `Bearer ${token}`)
        .field('name', 'Test Meal')
        .field('price', '500')
        .attach('image', './test_images/test.png', 'test.png')
        .then(async res => {
          try {
            expect(res).to.have.status(201);
            assert.equal(res.body.status, 'success');
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('POST /meals/', err.message));
    });
  });
});

describe('Caterer Modify Meal Endpoint Tests', () => {
  it(`PUT ${API_PREFIX}/meals/:mealId - Modify Meal Option (Unauthorized)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      const mealId = meals[0].id;
      chai
        .request(app)
        .put(`${API_PREFIX}/meals/${mealId}`)
        .send({
          name: 'Test Meal 2',
          price: '600'
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
        .catch(err => console.log('PUT /meals/:mealId', err.message));
    });
  });
  it(`PUT ${API_PREFIX}/meals/:mealId- Modify Meal Option - (Normal User Unauthorized)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      const mealId = meals[0].id;
      User.findOne({ where: { email: 'billy@newton.com' } }).then(user => {
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
          .put(`${API_PREFIX}/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Test Meal 2',
            price: '600'
          })
          .then(async res => {
            try {
              expect(res).to.have.status(401);
              assert.equal(res.body.status, 'error');
              await User.destroy({ where: { email: 'billy@newton.com' } });
              done();
            } catch (err) {
              console.log(err.message);
            }
          })
          .catch(err => console.log('PUT /meals/', err.message));
      });
    });
  });
  it(`PUT ${API_PREFIX}/meals/:mealId - Modify Meal Option - (Validation Test)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      const mealId = meals[0].id;
      Caterer.findOne({ where: { email: 'billy@newton.com' } }).then(caterer => {
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
          .put(`${API_PREFIX}/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 300
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
          .catch(err => console.log('POST /meals/', err.message));
      });
    });
  });
  it(`PUT ${API_PREFIX}/meals/:mealId - Modify Meal Option - (Caterer Can Modify Meal Option)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      const mealId = meals[0].id;
      Caterer.findOne({ where: { email: 'billy@newton.com' } }).then(caterer => {
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
          .put(`${API_PREFIX}/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .field('name', 'Test Meal 2')
          .field('price', '600')
          .attach('image', './test_images/test2.jpg', 'test2.jpg')
          .then(async res => {
            try {
              expect(res).to.have.status(200);
              assert.equal(res.body.status, 'success');
              done();
            } catch (err) {
              console.log(err.message);
            }
          })
          .catch(err => console.log('POST /meals/', err.message));
      });
    });
  });
});

describe('Caterer Can Delete Endpoint Tests', () => {
  it(`DELETE ${API_PREFIX}/meals/:mealId - Delete Meal (Unauthorized)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      let mealId = meals[0].id;
      chai
        .request(app)
        .delete(`${API_PREFIX}/meals/${mealId}`)
        .then(async res => {
          try {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, 'error');
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('DELETE /meals/:mealId', err.message));
    });
  });
  it(`DELETE ${API_PREFIX}/meals/:mealId - Delete Meal - (Normal User Unauthorized)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      const mealId = meals[0].id;
      User.create({
        name: 'Billy Newton',
        email: 'billy@newton.com',
        phone: '07075748392',
        password: 'billions'
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
          .delete(`${API_PREFIX}/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .then(async res => {
            try {
              expect(res).to.have.status(401);
              assert.equal(res.body.status, 'error');
              await User.destroy({ where: { email: 'billy@newton.com' } });
              done();
            } catch (err) {
              console.log(err.message);
            }
          })
          .catch(err => console.log('DELETE /meals/:mealId', err.message));
      });
    });
  });
  it(`DELETE ${API_PREFIX}/meals/:mealId - Delete Meal - (Caterer Authorized)`, done => {
    Meal.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']]
    }).then(meals => {
      const mealId = meals[0].id;
      Caterer.findOne({ where: { email: 'billy@newton.com' } }).then(caterer => {
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
          .delete(`${API_PREFIX}/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .then(async res => {
            try {
              expect(res).to.have.status(200);
              assert.equal(res.body.status, 'success');
              await Caterer.destroy({ where: { email: 'billy@newton.com' } });
              done();
            } catch (err) {
              console.log(err.message);
            }
          })
          .catch(err => console.log('DELETE /meals/:mealId', err.message));
      });
    });
  });
});
