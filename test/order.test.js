import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import secret from '../api/util/jwt_secret';
import User from '../api/models/user';
import Caterer from '../api/models/caterer';
import Order from '../api/models/orders';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

describe('Caterer Get all Orders Endpoint Tests', () => {
  it(`GET ${API_PREFIX}/orders - Fetch All Orders (Unauthorized)`, done => {
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
      .catch(err => console.log('GET /orders', err.message));
  });
  it(`GET ${API_PREFIX}/orders - Fetch All Orders - (Normal User Unauthorized)`, done => {
    User.create({
      name: 'Bruce Wayne',
      email: 'bruce@batman.com',
      phone: '07075748392',
      password: 'waynemanor'
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
        .get(`${API_PREFIX}/orders`)
        .set('Authorization', `Bearer ${token}`)
        .then(async res => {
          try {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, 'error');
            await User.destroy({ where: { email: 'bruce@batman.com' } });
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('GET /orders', err.message));
    });
  });
  it(`GET ${API_PREFIX}/orders - Fetch All Orders - (Caterer Authorized)`, done => {
    Caterer.create({
      name: 'Joffery Baratheon',
      email: 'jof@sppiledbrat.com',
      phone: '07075748391',
      password: 'oursisthefury'
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
        .get(`${API_PREFIX}/orders`)
        .set('Authorization', `Bearer ${token}`)
        .then(async res => {
          try {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            await Caterer.destroy({ where: { email: 'jof@sppiledbrat.com' } });
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('GET /orders', err.message));
    });
  });
});
