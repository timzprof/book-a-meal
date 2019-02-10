import Order from '../models/orders';

class OrderController {
  static orderMeal(req, res) {
    const { customerId, mealId } = req.body;
    const order = new Order(null, customerId, mealId, 1);
    order.addOrder();
    return res.status(201).json({
      status: 'success',
      message: 'Order Made'
    });
  }

  static async getOrders(req, res) {
    let response;
    try {
      const orders = await Order.fetchUserOrders(1);
      response = {
        code: 200,
        body: {
          status: 'success',
          message: 'Orders Retrieved',
          data: orders
        }
      };
    } catch (err) {
      response = {
        code: 500,
        body: {
          status: 'error',
          message: 'Failed to Retrive Orders',
          error: err.message
        }
      };
    }
    return res.status(response.code).json(response.body);
  }

  static async modifyOrder(req, res) {
    const { orderId } = req.params;
    const increase = req.body.increase ? req.body.increase : false;
    const decrease = req.body.decrease ? req.body.decrease : false;
    await Order.modifyOrderQuantity(orderId, increase, decrease);
    return res.status(200).json({
      status: 'success',
      message: 'Order Updated'
    });
  }
}

export default OrderController;
