import Order from '../models/orders';
import OrderItem from '../models/orderItem';

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
        await OrderItem.create({ mealId, quantity, userId: req.user.id });
        response.body = {
          status: 'success',
          message: 'Added to Orders'
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
    const { orderId } = req.params;
    const { mealId, action } = req.body;
    await Order.modifyOrderMeals(orderId, mealId, action);
    return res.status(200).json({
      status: 'success',
      message: 'Order Updated'
    });
  }
}

export default OrderController;
