import Meal from '../models/meals';

exports.addMealOption = (req, res) => {
  const { name, price, imageUrl } = req.body;
  const meal = new Meal(null, name, price, imageUrl);
  meal.add();
  return res.status(201).json({
    status: 'success',
    message: 'Meal Option Added'
  });
};

exports.getMealOptions = async (req, res) => {
  const meals = await Meal.fetchAll();
  return res.status(200).json({
    status: 'success',
    message: 'Meals Retrieved',
    data: meals
  });
};

exports.updateMealOption = (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl } = req.body;
  const meal = new Meal(id, name, price, imageUrl);
  meal.update();
  return res.status(201).json({
    status: 'success',
    message: 'Meal Option Updated'
  });
};
