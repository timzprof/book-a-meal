import Menu from '../models/menu';
import Order from '../models/orders';

exports.getMenus = async (req, res) => {
  let response;
  try {
    const menus = await Menu.fetchAll();
    response = {
      code: 200,
      body: {
        status: 'success',
        message: 'Menus Retrieved',
        data: menus
      }
    };
  } catch (err) {
    response = {
      code: 500,
      body: {
        status: 'error',
        message: 'Failed to Retrieve Menu',
        error: err.message
      }
    };
  }
  return res.status(response.code).json(response.body);
};

exports.orderMeal = (req, res) => {
  const { customerId, mealId } = req.body;
  const order = new Order(null, customerId, mealId, 1);
  order.addOrder();
  return res.status(201).json({
    status: 'success',
    message: 'Order Made'
  });
};

exports.getOrders = async (req, res) => {
  let response;
  try {
    const orders = await Order.fetchUserOrders();
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
};
