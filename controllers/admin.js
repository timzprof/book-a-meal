import Meal from '../models/meals';

exports.addMealOption = (req, res) => {
  const { name, price, imageUrl } = req.body;
  const meal = new Meal(null, name, price, imageUrl);
  meal.save();
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
