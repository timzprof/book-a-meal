import fs from 'fs';
import Meal from './meals';

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

class Order {
  constructor(id, customerId) {
    this.id = id;
    this.customerId = customerId;
    this.order = [];
    this.total = 0;
    this.delivery_status = false;
  }

  async addOrder(mealId, quantity) {
    try {
      let mealOrderExists = false;
      const orders = await getOrdersFromFile();
      const orderIndex = orders.findIndex(
        order => Number(order.customerId) === Number(this.customerId)
      );
      const userOrder = orders[orderIndex];
      if (orders.length > 0) {
        if (userOrder.order.length > 0) {
          userOrder.order.forEach(async (mealOrder, mealIndex) => {
            const updatedMealOrder = { ...mealOrder };
            if (updatedMealOrder.id === mealId) {
              mealOrderExists = true;
              const params = {
                orders,
                updatedMealOrder,
                mealOrder,
                mealIndex,
                orderIndex,
                quantity,
                userOrder
              };
              await Order.updateExistingMeal(params);
            }
          });
          if (!mealOrderExists) {
            const params = {
              orders,
              orderIndex,
              quantity,
              userOrder,
              mealId
            };
            await Order.addToExistingOrder(params);
          }
        }
      }
      if (!userOrder) {
        const params = { orders, userOrder, newOrder: this, mealId, quantity };
        await Order.addNewOrder(params);
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

  static async fetchUserOrders(customerId) {
    try {
      const orders = await getOrdersFromFile();
      const index = orders.findIndex(order => Number(order.customerId) === Number(customerId));
      return orders[index];
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
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async addNewOrder(params) {
    try {
      const { orders, mealId, quantity, newOrder } = params;
      newOrder.id = Number(orders.length + 1);
      const meal = await Meal.fetch(mealId);
      meal.quantity = quantity;
      meal.total = quantity * Number(meal.price);
      newOrder.total = meal.total;
      newOrder.order.push(meal);
      orders.push(newOrder);
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async addToExistingOrder(params) {
    try {
      const { orders, orderIndex, quantity, userOrder, mealId } = params;
      const meal = await Meal.fetch(mealId);
      meal.quantity = quantity;
      meal.total = quantity * Number(meal.price);
      userOrder.total += meal.total;
      userOrder.order.push(meal);
      orders[orderIndex] = userOrder;
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async updateExistingMeal(params) {
    try {
      const {
        orders,
        updatedMealOrder,
        mealOrder,
        orderIndex,
        userOrder,
        quantity,
        mealIndex
      } = params;
      updatedMealOrder.quantity += quantity;
      updatedMealOrder.total = updatedMealOrder.quantity * updatedMealOrder.price;
      userOrder.order[mealIndex] = updatedMealOrder;
      userOrder.total -= mealOrder.total;
      userOrder.total += updatedMealOrder.total;
      orders[orderIndex] = userOrder;
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Order;
