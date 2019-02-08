import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'orders.json');

// const getMealsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

class Order {
  constructor(customer, order, total) {
    this.customer = customer;
    this.order = order;
    this.total = total;
  }
}

export default Order;
