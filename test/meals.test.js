import fs from 'fs';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import Meal from '../api/models/meals';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const p = './api/data/meals.json';

const getMealsFromFile = () => {
  return new Promise(resolve => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        resolve([]);
      } else {
        resolve(JSON.parse(fileContent));
      }
    });
  });
};

const payload = {
  name: 'Test Meal',
  price: 400,
  imageUrl: 'img.png'
};

describe('Meal Endpoints', () => {
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/meals/`)
      .then(async res => {
        try {
          expect(res).to.have.status(200);
          const mealsFromFile = await getMealsFromFile();
          expect(mealsFromFile).to.eql(res.body.data);
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('GET /meals/', err.message));
  });
  it(`POST ${API_PREFIX}/meals/ - Add A Meal Option`, done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/meals/`)
      .send(payload)
      .then(async res => {
        try {
          expect(res).to.have.status(201);
          assert.equal(res.body.status, 'success');
          const mealsFromFile = await getMealsFromFile();
          const lastMeal = mealsFromFile[mealsFromFile.length - 1];
          expect(lastMeal.name).to.equal('Test Meal');
          expect(lastMeal.price).to.equal(400);
          expect(lastMeal.imageUrl).to.equal('img.png');
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /meals/', err.message));
  });
  it(`PUT ${API_PREFIX}/meals/:mealId - Update Meal Option`, done => {
    getMealsFromFile().then(mealsFromFile => {
      chai
        .request(app)
        .put(`${API_PREFIX}/meals/${mealsFromFile.length}`)
        .send({ price: 10000 })
        .then(async res => {
          try {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            const newMealsFromFile = await getMealsFromFile();
            const lastMeal = newMealsFromFile[newMealsFromFile.length - 1];
            expect(lastMeal.price).to.equal(10000);
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('PUT /meals/:mealId', err.message));
    });
  });
  it(`DELETE ${API_PREFIX}/meals/:mealId - Delete Meal Option`, done => {
    getMealsFromFile().then(mealsFromFile => {
      chai
        .request(app)
        .delete(`${API_PREFIX}/meals/${mealsFromFile.length}`)
        .then(async res => {
          try {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            const newMealsFromFile = await getMealsFromFile();
            const lastMeal = newMealsFromFile[newMealsFromFile.length - 1];
            expect(lastMeal.name).to.not.equal('Test Meal');
            expect(lastMeal.imageUrl).to.not.equal('img.png');
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('DELETE /meals/:mealId', err.message));
    });
  });
});
