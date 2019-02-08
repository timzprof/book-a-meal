import fs from 'fs';
import path from 'path';
import Meal from './meals';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'menu.json');

const getMenusFromFile = () => {
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

class Menu {
  constructor(catererId = 1, date, meals) {
    this.caterer = catererId;
    this.date = date;
    this.meals = meals;
  }

  async add(id) {
    const meal = await Meal.fetch(id);
    getMenusFromFile()
      .then(menus => {
        const date = new Date();
        this.date = date.toLocaleString('en-us', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
        const allMenus = [...menus];
        const menuIndex = menus.findIndex(menu => Number(menu.caterer) === Number(this.caterer));
        if (menuIndex !== -1) {
          const newMenu = allMenus[menuIndex];
          newMenu.meals.push(meal);
        } else {
          const newMenu = {};
          newMenu.date = this.date;
          newMenu.caterer = this.caterer;
          newMenu.meals = [meal];
          allMenus.push(newMenu);
        }
        fs.writeFile(p, JSON.stringify(allMenus), err => {
          if (err) console.log(err);
        });
        return true;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }

  static async fetchAll() {
    const menus = await getMenusFromFile();
    return menus;
  }
}

export default Menu;
