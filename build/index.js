"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = require("dotenv");

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = _interopRequireDefault(require("./routes"));

var _db = _interopRequireDefault(require("./util/db"));

var _user = _interopRequireDefault(require("./models/user"));

var _caterer = _interopRequireDefault(require("./models/caterer"));

var _meals = _interopRequireDefault(require("./models/meals"));

var _menu = _interopRequireDefault(require("./models/menu"));

var _orders = _interopRequireDefault(require("./models/orders"));

var _orderItem = _interopRequireDefault(require("./models/orderItem"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var app = (0, _express.default)();
var PORT = process.env.PORT || 7000;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use((0, _expressFileupload.default)());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use('/api/v1', _routes.default);

_user.default.hasMany(_orders.default, {
  constraints: true,
  onDelete: 'CASCADE'
});

_user.default.hasMany(_orderItem.default, {
  constraints: true,
  onDelete: 'CASCADE'
});

_orders.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: 'CASCADE'
});

_meals.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: 'CASCADE'
});

_menu.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: 'CASCADE'
});

_orderItem.default.belongsTo(_meals.default, {
  constraints: true,
  onDelete: 'CASCADE'
});

_db.default.sync().then(function () {
  console.log('DB Connection has been established');
  app.listen(PORT, null, null, function () {
    app.emit('dbConnected');
  });
}).catch(function (err) {
  console.error('Unable to connect to the database:', err);
});

var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map