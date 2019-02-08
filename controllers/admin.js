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
