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

  static async modifyOrderMeals(orderId, mealId, action) {
    try {
      const orders = await getOrdersFromFile();
      const index = orders.findIndex(order => Number(order.id) === Number(orderId));
      const updatedOrder = { ...orders[index] };
      const mealOrders = updatedOrder.order;
      const mealIndex = mealOrders.findIndex(mealOrder => mealOrder.id === mealId);
      const meal = mealOrders[mealIndex];
      const params = { orders, index, updatedOrder, mealOrders };
      if (action === 'increase') {
        meal.quantity += 1;
        meal.total += meal.price;
        await Order.modifyMealQuantity(params);
      } else if (action === 'decrease') {
        if (meal.quantity === 1) {
          params.orderId = orderId;
          params.mealIndex = mealIndex;
          await Order.deleteMealFromOrder(params);
        } else {
          meal.quantity -= 1;
          meal.total -= meal.price;
          await Order.modifyMealQuantity(params);
        }
      } else if (action === 'delete') {
        params.orderId = orderId;
        params.mealIndex = mealIndex;
        await Order.deleteMealFromOrder(params);
      }
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

  static async deleteMealFromOrder(params) {
    try {
      const { orderId, orders, index, updatedOrder, mealOrders, mealIndex } = params;
      const newUpdatedOrder = { ...updatedOrder };
      newUpdatedOrder.total -= mealOrders[mealIndex].total;
      mealOrders.splice(mealIndex, 1);
      newUpdatedOrder.order = mealOrders;
      if (mealOrders.length !== 0) {
        orders[index] = newUpdatedOrder;
        fs.writeFile(p, JSON.stringify(orders), err => {
          if (err) console.log(err);
        });
      } else {
        await Order.deleteById(orderId);
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async modifyMealQuantity(params) {
    try {
      const { orders, index, updatedOrder, mealOrders } = params;
      updatedOrder.total = 0;
      mealOrders.forEach(mealOrder => {
        updatedOrder.total += mealOrder.total;
      });
      orders[index] = updatedOrder;
      fs.writeFile(p, JSON.stringify(orders), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Order;
