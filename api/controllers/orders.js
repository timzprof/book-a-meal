import Order from '../models/orders';
import OrderItem from '../models/orderItem';
import Meal from '../models/meals';
import User from '../models/user';
import CateringService from '../models/catering_service';

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
        const meal = await Meal.findOne({ where: { id: mealId } });
        if (quantity > meal.quantity) {
          throw new Error('Quantity requested is higher than available');
        }
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
      const orders = await Order.findAll({
        where: { catererId: req.user.id },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email', 'phone']
          }
        ]
      });
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

      switch (action) {
        case 'increase':
          orderItem.quantity += 1;
          if (orderItem.quantity > orderItem.meal.quantity) {
            return res.status(200).json({
              status: 'warning',
              message: `Only ${orderItem.meal.quantity} serving${
                orderItem.meal.quantity > 1 ? 's' : ''
              } of ${orderItem.meal.name} ${orderItem.meal.quantity > 1 ? 'are' : 'is'} available`
            });
          }
          await OrderItem.update({ quantity: orderItem.quantity }, { where: { id: orderItem.id } });
          break;
        case 'decrease':
          orderItem.quantity -= 1;
          if (orderItem.quantity === 0) {
            await OrderItem.destroy({ where: { id: orderItem.id } });
          } else {
            await OrderItem.update(
              { quantity: orderItem.quantity },
              { where: { id: orderItem.id } }
            );
          }
          break;
        case 'delete':
          await OrderItem.destroy({ where: { id: orderItem.id } });
          break;
        default:
          break;
      }
      const updatedOrderItem = await OrderItem.findOne({ where: { id: orderItem.id } });
      return res.status(200).json({
        status: 'success',
        message: 'Order Updated',
        data: updatedOrderItem ? { ...updatedOrderItem.dataValues } : {}
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
      for await (const meal of meals) {
        const dbMeal = await Meal.findOne({ where: { id: meal.id } });
        const newQuantity = dbMeal.quantity - meal.quantity;
        await dbMeal.update({ quantity: newQuantity });

        let updatedMenu = [];
        const cateringService = await CateringService.findOne({
          where: { catererId: meal.catererId }
        });

        updatedMenu = cateringService.menu.map(jsonMeal => {
          const menuMeal = JSON.parse(jsonMeal);
          if (meal.id === menuMeal.id) {
            menuMeal.quantity -= meal.quantity;
          }
          return JSON.stringify(meal);
        });

        await cateringService.update({
          menu: updatedMenu
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async createOrders(caterers, meals, billingAddress, userId) {
    try {
      for await (const caterer of caterers) {
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
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default OrderController;
