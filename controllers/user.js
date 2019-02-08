import Menu from '../models/menu';

exports.getMenus = async (req, res) => {
  const menus = await Menu.fetchAll();
  return res.status(200).json({
    status: 'success',
    message: 'Menus Retrieved',
    data: menus
  });
};
