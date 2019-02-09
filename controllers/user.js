import Menu from '../models/menu';

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
    }
  }else {
    response = {
      code: 500,
      body: {
        status: 'error',
        message: 'Menus Empty'
      }
    }
  }
  return res.status(response.code).json(response.body);
};
