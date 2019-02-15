import fs from 'fs';
import path from 'path';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import secret from '../api/util/jwt_secret';
import Caterer from '../api/models/caterer';
import Meal from '../api/models/meals';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const srcImg = './test_images/test.png';
const imgFolder = './api/images';

const duplicateImage = () => {
  return new Promise((resolve, reject) => {
    fs.access(imgFolder, err => {
      const readStream = fs.createReadStream(srcImg);
      readStream.once('error', error => {
        reject(error.message);
      });
      readStream.pipe(fs.createWriteStream(path.join(imgFolder, 'fake.png')));
      if (err) reject(err.message);
    });
    resolve(true);
  });
};

const catererPayload = {
  name: 'Billy Newton',
  email: 'em@gd.com',
  phone: '07075748392',
  catering_service: 'Buy Food',
  password: 'billions'
};

before(done => {
  Caterer.create(catererPayload).then(() => {
    done();
  });
});

describe('Caterer Get all Meals Endpoint Tests', () => {
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/meals/`)
      .then(res => {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, 'error');
        done();
      })
      .catch(err => console.log('GET /meals/', err.message));
  });
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals - (Caterer Authorized)`, done => {
    Caterer.findOne({ where: { email: catererPayload.email } })
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
          .get(`${API_PREFIX}/meals/`)
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            done();
          })
          .catch(err => console.log('GET /meals/', err.message));
      })
      .catch(err => console.log(err.message));
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
      .then(res => {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, 'error');
        done();
      })
      .catch(err => console.log('POST /meals/', err.message));
  });
  it(`POST ${API_PREFIX}/meals/ - Add Meal Option - (Validation Test)`, done => {
    Caterer.findOne({ where: { email: catererPayload.email } })
      .then(caterer => {
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
          .then(res => {
            expect(res).to.have.status(400);
            assert.equal(res.body.status, 'error');
            done();
          })
          .catch(err => console.log('POST /meals/', err.message));
      })
      .catch(err => console.log(err.message));
  });
  it(`POST ${API_PREFIX}/meals/ - Add Meal Option - (Caterer Can Add Meal Option)`, done => {
    Caterer.findOne({ where: { email: catererPayload.email } })
      .then(caterer => {
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
          .then(res => {
            expect(res).to.have.status(201);
            assert.equal(res.body.status, 'success');
            done();
          })
          .catch(err => console.log('POST /meals/', err.message));
      })
      .catch(err => console.log(err.message));
  });
});

describe('Caterer Modify Meal Endpoint Tests', () => {
  duplicateImage()
    .then(() => {
      return Caterer.findOne({ where: { email: catererPayload.email } });
    })
    .then(caterer => {
      return Meal.create({
        name: 'Fake Meal',
        price: 1000,
        imageUrl: '/api/images/fake.png',
        catererId: caterer.id
      });
    })
    .then(meal => {
      it(`PUT ${API_PREFIX}/meals/:mealId - Modify Meal Option (Unauthorized)`, done => {
        chai
          .request(app)
          .put(`${API_PREFIX}/meals/${meal.id}`)
          .send({
            name: 'Test Meal 2',
            price: 600
          })
          .then(res => {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, 'error');
            done();
          })
          .catch(err => console.log('PUT /meals/:mealId', err.message));
      });
      it(`PUT ${API_PREFIX}/meals/:mealId - Modify Meal Option - (Validation Test)`, done => {
        Caterer.findOne({ where: { email: 'em@gd.com' } })
          .then(caterer => {
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
              .put(`${API_PREFIX}/meals/${meal.id}`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                name: 300
              })
              .then(res => {
                expect(res).to.have.status(400);
                assert.equal(res.body.status, 'error');
                done();
              })
              .catch(err => console.log('POST /meals/', err.message));
          })
          .catch(err => console.log(err.message));
      });
      it(`PUT ${API_PREFIX}/meals/:mealId - Modify Meal Option - (Caterer Can Modify Meal Option)`, done => {
        Caterer.findOne({ where: { email: catererPayload.email } })
          .then(caterer => {
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
              .put(`${API_PREFIX}/meals/${meal.id}`)
              .set('Authorization', `Bearer ${token}`)
              .field('name', 'Test Meal 2')
              .field('price', '600')
              .attach('image', './test_images/test2.jpg', 'test2.jpg')
              .then(res => {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, 'success');
                fs.unlink('./api/images/test2.jpg', err => {
                  if (err) console.log(err.message);
                });
                Meal.destroy({ where: { id: meal.id } }).then(() => {
                  done();
                });
              })
              .catch(err => console.log('POST /meals/', err.message));
          })
          .catch(err => console.log(err.message));
      });
    })
    .catch(err => console.log(err.message));
});

describe('Caterer Can Delete Meals Endpoint Tests', () => {
  duplicateImage()
    .then(() => {
      return Caterer.findOne({ where: { email: catererPayload.email } });
    })
    .then(caterer => {
      return Meal.create({
        name: 'Fake Meal',
        price: 1000,
        imageUrl: '/api/images/fake.png',
        catererId: caterer.id
      });
    })
    .then(meal => {
      it(`DELETE ${API_PREFIX}/meals/:mealId - Delete Meal (Unauthorized)`, done => {
        chai
          .request(app)
          .delete(`${API_PREFIX}/meals/${meal.id}`)
          .then(res => {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, 'error');
            done();
          })
          .catch(err => console.log('DELETE /meals/:mealId', err.message));
      });
      it(`DELETE ${API_PREFIX}/meals/:mealId - Delete Meal - (Caterer Authorized)`, done => {
        Caterer.findOne({ where: { email: catererPayload.email } })
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
              .delete(`${API_PREFIX}/meals/${meal.id}`)
              .set('Authorization', `Bearer ${token}`)
              .then(res => {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, 'success');
                done();
              })
              .catch(err => console.log('DELETE /meals/:mealId', err.message));
          })
          .catch(err => console.log(err.message));
      });
    })
    .catch(err => console.log(err.message));
});

after(done => {
  Caterer.destroy({ where: { email: catererPayload.email } }).then(() => {
    done();
  });
});
