"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var sequelize = new _sequelize.default(process.env.DATABASE_URL, {
  logging: false
});
var _default = sequelize;
exports.default = _default;
//# sourceMappingURL=db.js.map