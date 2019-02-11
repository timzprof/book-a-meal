import fs from 'fs';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import Order from '../api/models/orders';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const p = './api/data/orders.json';

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
  mealId: 1
};

const modifyPayload = {
  increase: true,
  decrease: false
};

describe('Order Endpoints', () => {
  it(`GET ${API_PREFIX}/orders - Fetch All Orders`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/orders`)
      .then(async res => {
        try {
          expect(res).to.have.status(200);
          const ordersFromFile = await getOrdersFromFile();
          expect(ordersFromFile).to.eql(res.body.data);
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('GET /orders', err.message));
  });
  it(`POST ${API_PREFIX}/orders- Order A Meal`, done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/orders`)
      .send(payload)
      .then(async res => {
        try {
          expect(res).to.have.status(201);
          assert.equal(res.body.status, 'success');
          const userOrders = await Order.fetchUserOrders(1);
          expect(userOrders[userOrders.length - 1].mealId).to.equal(1);
          done();
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch(err => console.log('POST /orders', err.message));
  });
  it(`PUT ${API_PREFIX}/orders/:orderId - Modify an order`, done => {
    getOrdersFromFile().then(ordersFromFile => {
      chai
        .request(app)
        .put(`${API_PREFIX}/orders/${ordersFromFile.length}`)
        .send(modifyPayload)
        .then(async res => {
          try {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, 'success');
            const userOrder = await Order.fetch(ordersFromFile.length);
            expect(userOrder.quantity).to.equal(2);
            await Order.deleteById(userOrder.id);
            done();
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch(err => console.log('PUT /orders/:orderId', err.message));
    });
  });
});
