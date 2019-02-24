"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _meals = _interopRequireDefault(require("../models/meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealController =
/*#__PURE__*/
function () {
  function MealController() {
    _classCallCheck(this, MealController);
  }

  _createClass(MealController, null, [{
    key: "addMealOption",
    value: function () {
      var _addMealOption = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, price, image, imageUrl, meal;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, name = _req$body.name, price = _req$body.price;
                image = req.files.image;
                imageUrl = "/api/images/".concat(image.name);
                _context.next = 6;
                return _meals.default.create({
                  name: name,
                  price: price,
                  imageUrl: imageUrl,
                  catererId: req.caterer.id
                });

              case 6:
                meal = _context.sent;
                _context.next = 9;
                return image.mv(".".concat(imageUrl));

              case 9:
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  message: 'Meal Option Added',
                  data: {
                    id: meal.id,
                    name: meal.name,
                    price: meal.price,
                    imageUrl: meal.imageUrl
                  }
                }));

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function addMealOption(_x, _x2) {
        return _addMealOption.apply(this, arguments);
      }

      return addMealOption;
    }()
  }, {
    key: "getMealOptions",
    value: function () {
      var _getMealOptions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var meals;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _meals.default.findAll({
                  where: {
                    catererId: req.caterer.id
                  }
                });

              case 2:
                meals = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Meals Retrieved',
                  data: meals
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMealOptions(_x3, _x4) {
        return _getMealOptions.apply(this, arguments);
      }

      return getMealOptions;
    }()
  }, {
    key: "updateMealOption",
    value: function () {
      var _updateMealOption = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var meal, mealUpdate, image, _imageUrl, name, price, imageUrl;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _meals.default.findOne({
                  where: {
                    id: req.params.id
                  }
                });

              case 3:
                meal = _context3.sent;

                if (meal) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Meal With ID ".concat(req.params.id, " does not exist"));

              case 6:
                mealUpdate = {
                  name: req.body.name ? req.body.name : meal.name,
                  price: req.body.price ? req.body.price : meal.price
                };

                if (!(req.files !== null)) {
                  _context3.next = 16;
                  break;
                }

                image = req.files.image;
                _imageUrl = "/api/images/".concat(image.name);

                _fs.default.unlink(".".concat(meal.imageUrl), function (err) {
                  if (err) throw new Error(err.message);
                });

                mealUpdate.imageUrl = _imageUrl;
                _context3.next = 14;
                return image.mv(".".concat(_imageUrl));

              case 14:
                _context3.next = 17;
                break;

              case 16:
                mealUpdate.imageUrl = meal.imageUrl;

              case 17:
                name = mealUpdate.name, price = mealUpdate.price, imageUrl = mealUpdate.imageUrl;
                _context3.next = 20;
                return _meals.default.update({
                  name: name,
                  price: price,
                  imageUrl: imageUrl
                }, {
                  where: {
                    id: req.params.id
                  }
                });

              case 20:
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Meal Option Updated'
                }));

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context3.t0.message
                }));

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 23]]);
      }));

      function updateMealOption(_x5, _x6) {
        return _updateMealOption.apply(this, arguments);
      }

      return updateMealOption;
    }()
  }, {
    key: "deleteMealOption",
    value: function () {
      var _deleteMealOption = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, meal;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                _context4.next = 4;
                return _meals.default.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                meal = _context4.sent;

                if (meal) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Meal with ID ".concat(id, " does not exist"));

              case 7:
                _fs.default.unlink(".".concat(meal.imageUrl), function (err) {
                  if (err) throw new Error(err.message);
                });

                _context4.next = 10;
                return meal.destroy();

              case 10:
                return _context4.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Meal Option Deleted'
                }));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context4.t0.message
                }));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function deleteMealOption(_x7, _x8) {
        return _deleteMealOption.apply(this, arguments);
      }

      return deleteMealOption;
    }()
  }]);

  return MealController;
}();

var _default = MealController;
exports.default = _default;
//# sourceMappingURL=meals.js.map