import fs from 'fs';
import Meal from './meals';

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
          }
        });
      }
      if (!orderAlreadyExists) {
        this.id = Number(orders.length + 1);
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

  static async fetchAll() {
    try {
      const orders = await getOrdersFromFile();
      return orders;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetchUserOrders(userId) {
    try {
      const orders = await getOrdersFromFile();
      return orders.filter(order => Number(order.customerId) === Number(userId));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async modifyOrderQuantity(orderId, increase, decrease) {
    try {
      const orders = await getOrdersFromFile();
      const index = orders.findIndex(order => Number(order.id) === Number(orderId));
      const updatedOrder = { ...orders[index] };
      if (increase) {
        updatedOrder.quantity += 1;
      } else if (decrease) {
        updatedOrder.quantity -= 1;
      }
      updatedOrder.total = updatedOrder.quantity * updatedOrder.order.price;
      orders[index] = updatedOrder;
      if (updatedOrder.quantity === 0) {
        orders.splice(index, 1);
      }
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async deleteById(id) {
    try {
      const orders = await getOrdersFromFile();
      const existingOrderIndex = orders.findIndex(order => Number(order.id) === Number(id));
      orders.splice(existingOrderIndex, 1);
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Order;
