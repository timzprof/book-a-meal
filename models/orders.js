import fs from 'fs';
import path from 'path';
import Meal from './meals';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'orders.json');

const getOrdersFromFile = cb => {
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

class Order {
  constructor(id, customerId, mealId, quantity) {
    this.id = id;
    this.customerId = customerId;
    this.mealId = mealId;
    this.order;
    this.quantity = quantity;
    this.total = 0;
    this.delivery_status = false;
  }

  async addOrder() {
    try {
      const orders = await getOrdersFromFile();
      this.id = orders.length + 1;
      const meal = await Meal.fetch(this.mealId);
      this.total = this.quantity * Number(meal.price);
      console.log(this.total);
      this.order = {...meal};
      orders.push(this);
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Order;
