"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _orders = _interopRequireDefault(require("../models/orders"));

var _orderItem = _interopRequireDefault(require("../models/orderItem"));

var _meals = _interopRequireDefault(require("../models/meals"));

var _menu = _interopRequireDefault(require("../models/menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrderController =
/*#__PURE__*/
function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, null, [{
    key: "addToOrders",
    value: function () {
      var _addToOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, mealId, quantity, orderItem, response, newOrderItem;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, mealId = _req$body.mealId, quantity = _req$body.quantity;
                _context.next = 4;
                return _orderItem.default.findOne({
                  where: {
                    mealId: mealId,
                    userId: req.user.id
                  }
                });

              case 4:
                orderItem = _context.sent;
                response = {};

                if (!orderItem) {
                  _context.next = 10;
                  break;
                }

                response.body = {
                  status: 'warning',
                  message: 'Order Already exists'
                };
                _context.next = 14;
                break;

              case 10:
                _context.next = 12;
                return _orderItem.default.create({
                  mealId: mealId,
                  quantity: quantity,
                  userId: req.user.id
                });

              case 12:
                newOrderItem = _context.sent;
                response.body = {
                  status: 'success',
                  message: 'Added to Orders',
                  data: newOrderItem
                };

              case 14:
                return _context.abrupt("return", res.status(200).json(response.body));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 17]]);
      }));

      function addToOrders(_x, _x2) {
        return _addToOrders.apply(this, arguments);
      }

      return addToOrders;
    }()
  }, {
    key: "getOrders",
    value: function () {
      var _getOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var orders;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _orders.default.findAll({
                  where: {
                    catererId: req.caterer.id
                  }
                });

              case 3:
                orders = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Orders Retrieved',
                  data: orders
                }));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context2.t0.message
                }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function getOrders(_x3, _x4) {
        return _getOrders.apply(this, arguments);
      }

      return getOrders;
    }()
  }, {
    key: "getOrderItems",
    value: function () {
      var _getOrderItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var orderItems, meals, total, order;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _orderItem.default.findAll({
                  where: {
                    userId: req.user.id
                  },
                  include: [_meals.default]
                });

              case 3:
                orderItems = _context3.sent;

                if (orderItems) {
                  _context3.next = 6;
                  break;
                }

                throw new Error('User Has No Order Items');

              case 6:
                meals = [];
                total = 0;
                orderItems.forEach(function (orderItem) {
                  var orderMeal = _objectSpread({}, orderItem);

                  orderMeal.meal.quantity = orderItem.quantity;
                  meals.push(orderMeal.meal);
                  total += orderItem.quantity * orderMeal.meal.price;
                });
                order = {
                  meals: meals,
                  total: total
                };
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Orders Retrieved',
                  data: order
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context3.t0.message
                }));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 13]]);
      }));

      function getOrderItems(_x5, _x6) {
        return _getOrderItems.apply(this, arguments);
      }

      return getOrderItems;
    }()
  }, {
    key: "modifyOrder",
    value: function () {
      var _modifyOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var orderId, action, orderItem;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                orderId = req.params.orderId;
                action = req.body.action;
                _context4.next = 5;
                return _orderItem.default.findOne({
                  where: {
                    id: orderId,
                    userId: req.user.id
                  },
                  include: [_meals.default]
                });

              case 5:
                orderItem = _context4.sent;

                if (!(action === 'increase')) {
                  _context4.next = 14;
                  break;
                }

                orderItem.quantity += 1;

                if (!(orderItem.quantity > orderItem.meal.quantity)) {
                  _context4.next = 10;
                  break;
                }

                throw new Error("Only ".concat(orderItem.meal.quantity, " servings of ").concat(orderItem.meal.name, " is available"));

              case 10:
                _context4.next = 12;
                return _orderItem.default.update({
                  quantity: orderItem.quantity
                }, {
                  where: {
                    id: orderItem.id
                  }
                });

              case 12:
                _context4.next = 28;
                break;

              case 14:
                if (!(action === 'decrease')) {
                  _context4.next = 25;
                  break;
                }

                orderItem.quantity -= 1;

                if (!(orderItem.quantity === 0)) {
                  _context4.next = 21;
                  break;
                }

                _context4.next = 19;
                return _orderItem.default.destroy({
                  where: {
                    id: orderItem.id
                  }
                });

              case 19:
                _context4.next = 23;
                break;

              case 21:
                _context4.next = 23;
                return _orderItem.default.update({
                  quantity: orderItem.quantity
                }, {
                  where: {
                    id: orderItem.id
                  }
                });

              case 23:
                _context4.next = 28;
                break;

              case 25:
                if (!(action === 'delete')) {
                  _context4.next = 28;
                  break;
                }

                _context4.next = 28;
                return _orderItem.default.destroy({
                  where: {
                    id: orderItem.id
                  }
                });

              case 28:
                return _context4.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Order Updated'
                }));

              case 31:
                _context4.prev = 31;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context4.t0.message
                }));

              case 34:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 31]]);
      }));

      function modifyOrder(_x7, _x8) {
        return _modifyOrder.apply(this, arguments);
      }

      return modifyOrder;
    }()
  }, {
    key: "checkoutOrders",
    value: function () {
      var _checkoutOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var orderItems, meals, caterers;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _orderItem.default.findAll({
                  where: {
                    userId: req.user.id
                  },
                  include: [_meals.default]
                });

              case 3:
                orderItems = _context5.sent;

                if (orderItems) {
                  _context5.next = 6;
                  break;
                }

                throw new Error('No Order Items Found');

              case 6:
                meals = [];
                caterers = new Set();
                orderItems.forEach(function (orderItem) {
                  var orderMeal = _objectSpread({}, orderItem);

                  orderMeal.meal.quantity = orderItem.quantity;
                  meals.push(orderMeal.meal);
                  caterers.add(orderMeal.meal.catererId);
                });
                _context5.next = 11;
                return OrderController.reduceQuantity(meals);

              case 11:
                _context5.next = 13;
                return _orderItem.default.destroy({
                  where: {
                    userId: req.user.id
                  }
                });

              case 13:
                _context5.next = 15;
                return OrderController.createOrders(caterers, meals, req.body.billingAddress, req.user.id);

              case 15:
                return _context5.abrupt("return", res.status(201).json({
                  status: 'success',
                  message: 'Order Made'
                }));

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context5.t0.message
                }));

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 18]]);
      }));

      function checkoutOrders(_x9, _x10) {
        return _checkoutOrders.apply(this, arguments);
      }

      return checkoutOrders;
    }()
  }, {
    key: "reduceQuantity",
    value: function () {
      var _reduceQuantity = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(meals) {
        var meal;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                meal = meals[0];

                _meals.default.findOne({
                  where: {
                    id: meal.id
                  }
                }).then(function (dbMeal) {
                  return dbMeal.update({
                    quantity: dbMeal.quantity - meal.quantity
                  }, {
                    where: {
                      id: meal.id
                    }
                  });
                }).then(function () {
                  return _menu.default.findOne({
                    where: {
                      catererId: meal.catererId
                    }
                  });
                }).then(function (menu) {
                  var menuMeals = JSON.parse(menu.meals);
                  var updatedMenuMeals = menuMeals.map(function (menuMeal) {
                    var updatedMenuMeal = _objectSpread({}, menuMeal);

                    if (menuMeal.id === meal.id) {
                      updatedMenuMeal.quantity -= meal.quantity;
                    }

                    return updatedMenuMeal;
                  });
                  return menu.update({
                    meals: JSON.stringify(updatedMenuMeals)
                  }, {
                    where: {
                      id: menu.id
                    }
                  });
                }).then(function () {
                  meals.shift();
                  return meals.length !== 0 ? OrderController.reduceQuantity(meals) : true;
                });

                _context6.next = 8;
                break;

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6["catch"](0);
                throw new Error(_context6.t0.message);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 5]]);
      }));

      function reduceQuantity(_x11) {
        return _reduceQuantity.apply(this, arguments);
      }

      return reduceQuantity;
    }()
  }, {
    key: "createOrders",
    value: function () {
      var _createOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(caterers, meals, billingAddress, userId) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                caterers.forEach(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(caterer) {
                    var catererTotal, catererMeals;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            catererTotal = 0;
                            catererMeals = meals.filter(function (meal) {
                              return meal.catererId === caterer;
                            });
                            catererMeals.forEach(function (catererMeal) {
                              catererTotal += catererMeal.quantity * catererMeal.price;
                            });
                            _context7.next = 5;
                            return _orders.default.create({
                              order: JSON.stringify(catererMeals),
                              total: catererTotal,
                              billing_address: billingAddress,
                              catererId: caterer,
                              userId: userId,
                              delivery_status: 0
                            });

                          case 5:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7, this);
                  }));

                  return function (_x16) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context8.next = 7;
                break;

              case 4:
                _context8.prev = 4;
                _context8.t0 = _context8["catch"](0);
                throw new Error(_context8.t0.message);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 4]]);
      }));

      function createOrders(_x12, _x13, _x14, _x15) {
        return _createOrders.apply(this, arguments);
      }

      return createOrders;
    }()
  }]);

  return OrderController;
}();

var _default = OrderController;
exports.default = _default;
//# sourceMappingURL=orders.js.map