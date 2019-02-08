import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'menu.json');

// const getMealsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

class Menu {
  constructor(caterer, meals) {
    this.caterer = caterer;
    this.meals = meals;
  }
}

export default Menu;
