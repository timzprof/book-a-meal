import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'meals.json');

const getMealsFromFile = () => {
  return new Promise(resolve => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        resolve([]);
      } else {
        resolve(JSON.parse(fileContent));
      }
    });
  });
};

class Meal {
  constructor(id, name, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  add() {
    getMealsFromFile()
      .then(meals => {
        this.id = meals.length + 1;
        meals.push(this);
        fs.writeFile(p, JSON.stringify(meals), err => {
          if (err) console.log(err);
        });
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }

  update() {
    getMealsFromFile().then(meals => {
      const existingMealIndex = meals.findIndex(meal => Number(meal.id) === Number(this.id));
      const updatedMeals = [...meals];
      const mealArray = Object.entries(this);
      mealArray.forEach(mealProp => {
        const [property, value] = mealProp;
        if (value !== undefined) {
          updatedMeals[existingMealIndex][property] = value;
        }
      });
      fs.writeFile(p, JSON.stringify(updatedMeals), err => {
        if (err) console.log(err);
      });
    });
  }

  static async fetchAll() {
    const meals = await getMealsFromFile();
    return meals;
  }

  static async fetch(id) {
    const meals = await getMealsFromFile();
    const index = meals.findIndex(meal => Number(meal.id) === Number(id));
    return meals[index];
  }

  static async deleteById(id) {
    const meals = await getMealsFromFile();
    const existingMealIndex = meals.findIndex(meal => Number(meal.id) === Number(id));
    meals.splice(existingMealIndex, 1);
    fs.writeFile(p, JSON.stringify(meals), err => {
      if (err) console.log(err);
    });
    return true;
  }
}

export default Meal;
