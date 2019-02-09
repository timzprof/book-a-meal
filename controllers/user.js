import Menu from '../models/menu';
import Order from '../models/orders';

exports.getMenus = async (req, res) => {
  let response;
  const menus = await Menu.fetchAll();
  if (menus) {
    response = {
      code: 200,
      body: {
        status: 'success',
        message: 'Menus Retrieved',
        data: menus
      }
    };
  } else {
    response = {
      code: 500,
      body: {
        status: 'error',
        message: 'Menus Empty'
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
