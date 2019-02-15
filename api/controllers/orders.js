import Order from '../models/orders';

class OrderController {
  static async orderMeal(req, res) {
    const { mealId, quantity, customerId } = req.body;
    const order = new Order(null, customerId);
    await order.addOrder(mealId, quantity);
    return res.status(201).json({
      status: 'success',
      message: 'Order Made'
    });
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
