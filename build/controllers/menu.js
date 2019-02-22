"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../models/menu"));

var _meals = _interopRequireDefault(require("../models/meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuController =
/*#__PURE__*/
function () {
  function MenuController() {
    _classCallCheck(this, MenuController);
  }

  _createClass(MenuController, null, [{
    key: "generateDate",
    value: function generateDate() {
      var date = new Date();
      var month = "".concat(date.getMonth() + 1);
      var today = "".concat(date.getFullYear(), "-").concat(month.padStart(2, '0'), "-").concat(date.getDate());
      return today;
    }
  }, {
    key: "getMenus",
    value: function () {
      var _getMenus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var today, menus;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                today = MenuController.generateDate();
                _context.next = 4;
                return _menu.default.findAll({
                  where: {
                    createdAt: today
                  }
                });

              case 4:
                menus = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Menus Retrieved',
                  data: menus
                }));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function getMenus(_x, _x2) {
        return _getMenus.apply(this, arguments);
      }

      return getMenus;
    }()
  }, {
    key: "getSingleMenu",
    value: function () {
      var _getSingleMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var today, menu;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                today = MenuController.generateDate();
                _context2.next = 4;
                return _menu.default.findOne({
                  where: {
                    createdAt: today,
                    catererId: req.caterer.id
                  }
                });

              case 4:
                menu = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Caterer Menu Retrieved',
                  data: menu
                }));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context2.t0.message
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function getSingleMenu(_x3, _x4) {
        return _getSingleMenu.apply(this, arguments);
      }

      return getSingleMenu;
    }()
  }, {
    key: "addMealToMenu",
    value: function () {
      var _addMealToMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$body, mealId, quantity, meal, _meal$dataValues, createdAt, updatedAt, safeMeal, today, menu, menuMeals, mealIndex;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body = req.body, mealId = _req$body.mealId, quantity = _req$body.quantity;
                _context3.next = 4;
                return _meals.default.findOne({
                  where: {
                    id: mealId,
                    catererId: req.caterer.id
                  }
                });

              case 4:
                meal = _context3.sent;

                if (meal) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Meal with that ID Doesn't exist");

              case 7:
                _meal$dataValues = meal.dataValues, createdAt = _meal$dataValues.createdAt, updatedAt = _meal$dataValues.updatedAt, safeMeal = _objectWithoutProperties(_meal$dataValues, ["createdAt", "updatedAt"]);
                safeMeal.quantity = Number(quantity);
                today = MenuController.generateDate();
                _context3.next = 12;
                return _menu.default.findAll({
                  where: {
                    catererId: req.caterer.id,
                    createdAt: today
                  }
                });

              case 12:
                menu = _context3.sent;

                if (!(menu.length === 0)) {
                  _context3.next = 22;
                  break;
                }

                menuMeals = [];
                menuMeals.push(safeMeal);
                _context3.next = 18;
                return _menu.default.create({
                  meals: JSON.stringify(menuMeals),
                  catererId: req.caterer.id
                });

              case 18:
                _context3.next = 20;
                return _meals.default.update({
                  quantity: quantity
                }, {
                  where: {
                    id: mealId
                  }
                });

              case 20:
                _context3.next = 30;
                break;

              case 22:
                _context3.next = 24;
                return MenuController.updateMeals(menu[0], safeMeal, mealId, quantity);

              case 24:
                menuMeals = _context3.sent;
                _context3.next = 27;
                return _menu.default.update({
                  meals: JSON.stringify(menuMeals)
                }, {
                  where: {
                    catererId: req.caterer.id,
                    createdAt: today
                  }
                });

              case 27:
                mealIndex = menuMeals.findIndex(function (menuMeal) {
                  return menuMeal.id === Number(mealId);
                });
                _context3.next = 30;
                return _meals.default.update({
                  quantity: menuMeals[mealIndex].quantity
                }, {
                  where: {
                    id: mealId
                  }
                });

              case 30:
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Meal Added to Menu',
                  data: menuMeals
                }));

              case 33:
                _context3.prev = 33;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context3.t0.message
                }));

              case 36:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 33]]);
      }));

      function addMealToMenu(_x5, _x6) {
        return _addMealToMenu.apply(this, arguments);
      }

      return addMealToMenu;
    }()
  }, {
    key: "updateMeals",
    value: function () {
      var _updateMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(menu, safeMeal, mealId, quantity) {
        var meals, updatedMenuMeals, mealIndex;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                meals = menu.dataValues.meals;
                updatedMenuMeals = JSON.parse(meals);
                mealIndex = updatedMenuMeals.findIndex(function (menuMeal) {
                  return menuMeal.id === Number(mealId);
                });

                if (mealIndex < 0) {
                  updatedMenuMeals.push(safeMeal);
                } else {
                  updatedMenuMeals[mealIndex].quantity += Number(quantity);
                }

                return _context4.abrupt("return", updatedMenuMeals);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                throw new Error("Update - ".concat(_context4.t0.message));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function updateMeals(_x7, _x8, _x9, _x10) {
        return _updateMeals.apply(this, arguments);
      }

      return updateMeals;
    }()
  }]);

  return MenuController;
}();

var _default = MenuController;
exports.default = _default;
//# sourceMappingURL=menu.js.map