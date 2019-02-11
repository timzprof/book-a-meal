import fs from 'fs';

const p = './data/meals.json';

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
  constructor(id, name, price, imageUrl, catererId = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.catererId = catererId;
  }

  async add() {
    try {
      const meals = await getMealsFromFile();
      this.id = meals.length + 1;
      meals.push(this);
      fs.writeFile(p, JSON.stringify(meals), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update() {
    try {
      const meals = await getMealsFromFile();
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
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetchAll() {
    try {
      const meals = await getMealsFromFile();
      return meals;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async fetch(id) {
    try {
      const meals = await getMealsFromFile();
      const index = meals.findIndex(meal => Number(meal.id) === Number(id));
      return meals[index];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async deleteById(id) {
    try {
      const meals = await getMealsFromFile();
      const existingMealIndex = meals.findIndex(meal => Number(meal.id) === Number(id));
      meals.splice(existingMealIndex, 1);
      fs.writeFile(p, JSON.stringify(meals), err => {
        if (err) console.log(err);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Meal;
