"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../util/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Caterer = _db.default.define('caterer', {
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
  email: {
    type: _sequelize.default.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  catering_service: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  createdAt: _sequelize.default.DATEONLY,
  updatedAt: _sequelize.default.DATEONLY
});

var _default = Caterer;
exports.default = _default;
//# sourceMappingURL=caterer.js.map