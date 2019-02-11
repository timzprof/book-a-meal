import fs from 'fs';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';
import Order from '../models/orders';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const p = './data/orders.json';

const getOrdersFromFile = () => {
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
  customerId: 1,
  mealId: 2
};

describe('Order Endpoints', () => {
  it(`GET ${API_PREFIX}/orders - Fetch All Orders`, () => {
    chai
      .request(app)
      .get(`${API_PREFIX}/orders`)
      .then(async res => {
        expect(res).to.have.status(200);
        const ordersFromFile = await getOrdersFromFile();
        expect(ordersFromFile).to.eql(res.body.data);
      })
      .catch(err => console.log('GET /orders', err.message));
  });
  it(`POST ${API_PREFIX}/orders- Order A Meal`, () => {
    chai
      .request(app)
      .post(`${API_PREFIX}/orders`)
      .send(payload)
      .then(async res => {
        expect(res).to.have.status(200);
        assert.equal(res.body.status, 'success');
        const userOrders = await Order.fetchUserOrders(1);
        expect(userOrders[userOrders.length - 1].order.id).to.equal(2);
      })
      .catch(err => console.log('POST /orders', err.message));
  });
});