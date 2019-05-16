import Order from '../models/orders';
import OrderItem from '../models/orderItem';
import Meal from '../models/meals';
import Menu from '../models/menu';

class OrderController {
  static async addToOrders(req, res) {
    try {
      const { mealId, quantity } = req.body;
      const orderItem = await OrderItem.findOne({ where: { mealId, userId: req.user.id } });
      const response = {};
      if (orderItem) {
        response.body = {
          status: 'warning',
          message: 'Order Already exists'
        };
      } else {
        const newOrderItem = await OrderItem.create({ mealId, quantity, userId: req.user.id });
        response.body = {
          status: 'success',
          message: 'Added to Orders',
          data: newOrderItem
        };
      }
      return res.status(200).json(response.body);
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async getOrders(req, res) {
    try {
      const orders = await Order.findAll({ where: { catererId: req.caterer.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Orders Retrieved',
        data: orders
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async getOrderItems(req, res) {
    try {
      const orderItems = await OrderItem.findAll({
        where: { userId: req.user.id },
        include: [Meal]
      });
      if (!orderItems) {
        throw new Error('User Has No Order Items');
      }
      const meals = [];
      let total = 0;
      orderItems.forEach(orderItem => {
        const orderMeal = { ...orderItem };
        orderMeal.meal.quantity = orderItem.quantity;
        meals.push({ ...orderMeal.meal.dataValues, orderId: orderItem.id });
        total += orderItem.quantity * orderMeal.meal.price;
      });
      const order = { meals, total };
      return res.status(200).json({
        status: 'success',
        message: 'Orders Retrieved',
        data: order
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async modifyOrder(req, res) {
    try {
      const { orderId } = req.params;
      const { action } = req.body;
      const orderItem = await OrderItem.findOne({
        where: { id: orderId, userId: req.user.id },
        include: [Meal]
      });
      if (action === 'increase') {
        orderItem.quantity += 1;
        if (orderItem.quantity > orderItem.meal.quantity) {
          throw new Error(
            `Only ${orderItem.meal.quantity} servings of ${orderItem.meal.name} is available`
          );
        }
        await OrderItem.update({ quantity: orderItem.quantity }, { where: { id: orderItem.id } });
      } else if (action === 'decrease') {
        orderItem.quantity -= 1;
        if (orderItem.quantity === 0) {
          await OrderItem.destroy({ where: { id: orderItem.id } });
        } else {
          await OrderItem.update({ quantity: orderItem.quantity }, { where: { id: orderItem.id } });
        }
      } else if (action === 'delete') {
        await OrderItem.destroy({ where: { id: orderItem.id } });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Order Updated'
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async checkoutOrders(req, res) {
    try {
      const orderItems = await OrderItem.findAll({
        where: { userId: req.user.id },
        include: [Meal]
      });
      if (!orderItems) {
        throw new Error('No Order Items Found');
      }
      const meals = [];
      const caterers = new Set();
      orderItems.forEach(orderItem => {
        const orderMeal = { ...orderItem };
        orderMeal.meal.quantity = orderItem.quantity;
        meals.push(orderMeal.meal);
        caterers.add(orderMeal.meal.catererId);
      });
      await OrderController.reduceQuantity(meals);
      await OrderItem.destroy({ where: { userId: req.user.id } });
      await OrderController.createOrders(caterers, meals, req.body.billingAddress, req.user.id);
      return res.status(201).json({
        status: 'success',
        message: 'Order Made'
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  }

  static async reduceQuantity(meals) {
    try {
      const meal = meals[0];
      Meal.findOne({ where: { id: meal.id } })
        .then(dbMeal => {
          return dbMeal.update(
            { quantity: dbMeal.quantity - meal.quantity },
            { where: { id: meal.id } }
          );
        })
        .then(() => {
          return Menu.findOne({ where: { catererId: meal.catererId } });
        })
        .then(menu => {
          const menuMeals = JSON.parse(menu.meals);
          const updatedMenuMeals = menuMeals.map(menuMeal => {
            const updatedMenuMeal = { ...menuMeal };
            if (menuMeal.id === meal.id) {
              updatedMenuMeal.quantity -= meal.quantity;
            }
            return updatedMenuMeal;
          });
          return menu.update(
            { meals: JSON.stringify(updatedMenuMeals) },
            { where: { id: menu.id } }
          );
        })
        .then(() => {
          meals.shift();
          return meals.length !== 0 ? OrderController.reduceQuantity(meals) : true;
        });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async createOrders(caterers, meals, billingAddress, userId) {
    try {
      caterers.forEach(async caterer => {
        let catererTotal = 0;
        const catererMeals = meals.filter(meal => meal.catererId === caterer);
        catererMeals.forEach(catererMeal => {
          catererTotal += catererMeal.quantity * catererMeal.price;
        });
        await Order.create({
          order: JSON.stringify(catererMeals),
          total: catererTotal,
          billing_address: billingAddress,
          catererId: caterer,
          userId,
          delivery_status: 0
        });
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default OrderController;
