import Order from '../models/orders';
import OrderItem from '../models/orderItem';
import Meal from '../models/meals';

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
}

export default OrderController;
