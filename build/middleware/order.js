"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrderMiddleware =
/*#__PURE__*/
function () {
  function OrderMiddleware() {
    _classCallCheck(this, OrderMiddleware);
  }

  _createClass(OrderMiddleware, null, [{
    key: "validateAddToOrder",
    value: function () {
      var _validateAddToOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var schema;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                schema = {
                  mealId: _joi.default.number().min(1).required(),
                  quantity: _joi.default.number().min(1).required()
                };
                _context.next = 4;
                return _joi.default.validate(req.body, schema);

              case 4:
                next();
                return _context.abrupt("return", true);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: String(_context.t0.details[0].message),
                  type: 'validation'
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function validateAddToOrder(_x, _x2, _x3) {
        return _validateAddToOrder.apply(this, arguments);
      }

      return validateAddToOrder;
    }()
  }, {
    key: "validateModifyOrder",
    value: function () {
      var _validateModifyOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var schema, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                schema = {
                  action: _joi.default.string().required()
                };
                _context2.next = 4;
                return _joi.default.validate(req.body, schema);

              case 4:
                if (['increase', 'decrease', 'delete'].includes(req.body.action)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Invalid Action Requested');

              case 6:
                next();
                return _context2.abrupt("return", true);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);

                if (_context2.t0.details !== undefined) {
                  message = String(_context2.t0.details[0].message);
                } else {
                  message = String(_context2.t0.message);
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: message,
                  type: 'validation'
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function validateModifyOrder(_x4, _x5, _x6) {
        return _validateModifyOrder.apply(this, arguments);
      }

      return validateModifyOrder;
    }()
  }, {
    key: "validateOrdeCheckout",
    value: function () {
      var _validateOrdeCheckout = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var schema, message;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                schema = {
                  billingAddress: _joi.default.string().required()
                };
                _context3.next = 4;
                return _joi.default.validate(req.body, schema);

              case 4:
                next();
                return _context3.abrupt("return", true);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

                if (_context3.t0.details !== undefined) {
                  message = String(_context3.t0.details[0].message);
                } else {
                  message = String(_context3.t0.message);
                }

                return _context3.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: message,
                  type: 'validation'
                }));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function validateOrdeCheckout(_x7, _x8, _x9) {
        return _validateOrdeCheckout.apply(this, arguments);
      }

      return validateOrdeCheckout;
    }()
  }]);

  return OrderMiddleware;
}();

var _default = OrderMiddleware;
exports.default = _default;
//# sourceMappingURL=order.js.map