import fs from 'fs';
import path from 'path';
import Meal from './meals';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'orders.json');

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

class Order {
  constructor(id, customerId, mealId, quantity) {
    this.id = id;
    this.customerId = customerId;
    this.mealId = mealId;
    this.order = {};
    this.quantity = quantity;
    this.total = 0;
    this.delivery_status = false;
  }

  async addOrder() {
    try {
      let orderAlreadyExists = false;
      const orders = await getOrdersFromFile();
      if (orders.length > 0) {
        orders.forEach((order, index) => {
          const updatedOrder = { ...order };
          if (updatedOrder.mealId === this.mealId && updatedOrder.customerId === this.customerId) {
            orderAlreadyExists = true;
            updatedOrder.quantity += this.quantity;
            updatedOrder.total = updatedOrder.quantity * updatedOrder.order.price;
            orders[index] = updatedOrder;
            fs.writeFile(p, JSON.stringify(orders), err => {
              if (err) console.log(err);
            });
            return;
          }
        });
      }
      if (!orderAlreadyExists) {
        this.id = orders.length + 1;
        const meal = await Meal.fetch(this.mealId);
        this.total = this.quantity * Number(meal.price);
        this.order = { ...meal };
        orders.push(this);
        fs.writeFile(p, JSON.stringify(orders), err => {
          if (err) console.log(err);
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetch(id) {
    try {
      const orders = await getOrdersFromFile();
      const index = orders.findIndex(order => Number(order.id) === Number(id));
      return orders[index];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetchUserOrders() {
    try {
      const orders = await getOrdersFromFile();
      const userOrders = orders.filter(order => Number(order.customerId) === 1);
      return userOrders;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Order;
