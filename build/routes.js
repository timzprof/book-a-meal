"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _trimRequest = _interopRequireDefault(require("trim-request"));

var _user = _interopRequireDefault(require("./middleware/user"));

var _caterer = _interopRequireDefault(require("./middleware/caterer"));

var _meals = _interopRequireDefault(require("./middleware/meals"));

var _order = _interopRequireDefault(require("./middleware/order"));

var _auth = _interopRequireDefault(require("./controllers/auth"));

var _meals2 = _interopRequireDefault(require("./controllers/meals"));

var _menu = _interopRequireDefault(require("./controllers/menu"));

var _orders = _interopRequireDefault(require("./controllers/orders"));

var _user2 = _interopRequireDefault(require("./controllers/user"));

var _caterer2 = _interopRequireDefault(require("./controllers/caterer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/auth/signup', _trimRequest.default.body, _user.default.validateRegister, _user2.default.registerUser);
router.post('/auth/login', _trimRequest.default.body, _user.default.validateLogin, _user2.default.loginUser);
router.post('/auth/caterer/signup', _trimRequest.default.body, _caterer.default.validateRegister, _caterer2.default.registerCaterer);
router.post('/auth/caterer/login', _trimRequest.default.body, _caterer.default.validateLogin, _caterer2.default.loginCaterer);
router.get('/meals/', _auth.default.checkForToken, _auth.default.verifyAdminToken, _meals2.default.getMealOptions);
router.post('/meals/', _trimRequest.default.body, _auth.default.checkForToken, _auth.default.verifyAdminToken, _meals.default.validateAddMeal, _meals2.default.addMealOption);
router.put('/meals/:id', _trimRequest.default.body, _auth.default.checkForToken, _auth.default.verifyAdminToken, _meals.default.validateUpdateMeal, _meals2.default.updateMealOption);
router.delete('/meals/:id', _auth.default.checkForToken, _auth.default.verifyAdminToken, _meals2.default.deleteMealOption);
router.get('/menu/', _auth.default.checkForToken, _auth.default.verifyUserToken, _menu.default.getMenus);
router.get('/menu/caterer', _auth.default.checkForToken, _auth.default.verifyAdminToken, _menu.default.getSingleMenu);
router.post('/menu/', _trimRequest.default.body, _auth.default.checkForToken, _auth.default.verifyAdminToken, _meals.default.validateAddMealToMenu, _menu.default.addMealToMenu);
router.get('/orders', _auth.default.checkForToken, _auth.default.verifyAdminToken, _orders.default.getOrders);
router.get('/orders/user', _auth.default.checkForToken, _auth.default.verifyUserToken, _orders.default.getOrderItems);
router.post('/orders', _trimRequest.default.body, _auth.default.checkForToken, _auth.default.verifyUserToken, _order.default.validateAddToOrder, _orders.default.addToOrders);
router.put('/orders/:orderId', _trimRequest.default.body, _auth.default.checkForToken, _auth.default.verifyUserToken, _order.default.validateModifyOrder, _orders.default.modifyOrder);
router.post('/orders/checkout', _trimRequest.default.body, _auth.default.checkForToken, _auth.default.verifyUserToken, _order.default.validateOrdeCheckout, _orders.default.checkoutOrders);
var _default = router;
exports.default = _default;
//# sourceMappingURL=routes.js.map