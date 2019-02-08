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

  save() {
    getMealsFromFile()
      .then(meals => {
        if (this.id) {
          const existingMealIndex = meals.findIndex(meal => meal.id === this.id);
          const updatedMeals = [...meals];
          updatedMeals[existingMealIndex] = this;
          fs.writeFile(p, JSON.stringify(updatedMeals), err => {
            console.log(err);
          });
        } else {
          this.id = meals.length + 1;
          meals.push(this);
          fs.writeFile(p, JSON.stringify(meals), err => {
            console.log(err);
          });
        }
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }
}

export default Meal;
