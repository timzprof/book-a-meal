"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../util/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meal = _db.default.define('meal', {
  id: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  price: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  quantity: {
    type: _sequelize.default.INTEGER,
    default: null
  },
  imageUrl: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  catererId: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  createdAt: _sequelize.default.DATEONLY,
  updatedAt: _sequelize.default.DATEONLY
});

var _default = Meal;
exports.default = _default;
//# sourceMappingURL=meals.js.map