import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import secret from '../api/util/jwt_secret';
import User from '../api/models/user';
import Caterer from '../api/models/caterer';
import Menu from '../api/models/menu';

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