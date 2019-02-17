"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../util/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Order = _db.default.define('order', {
  id: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  order: {
    type: _sequelize.default.JSON,
    allowNull: false
  },
  total: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  billing_address: {
    type: _sequelize.default.TEXT,
    allowNull: false
  },
  delivery_status: {
    type: _sequelize.default.INTEGER,
    default: 0
  },
  catererId: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  userId: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  createdAt: _sequelize.default.DATEONLY,
  updatedAt: _sequelize.default.DATEONLY
});

var _default = Order;
exports.default = _default;
//# sourceMappingURL=orders.js.map