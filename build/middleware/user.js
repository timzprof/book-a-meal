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

var UserMiddleware =
/*#__PURE__*/
function () {
  function UserMiddleware() {
    _classCallCheck(this, UserMiddleware);
  }

  _createClass(UserMiddleware, null, [{
    key: "validateRegister",
    value: function () {
      var _validateRegister = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var schema;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                schema = {
                  name: _joi.default.string().required(),
                  email: _joi.default.string().email().required(),
                  phone: _joi.default.number().min(11).required(),
                  password: _joi.default.string().min(7).required()
                };
                _context.next = 4;
                return _joi.default.validate(req.body, schema);

              case 4:
                next();
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: String(_context.t0.details[0].message),
                  type: 'validation'
                }));

              case 10:
                return _context.abrupt("return", true);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function validateRegister(_x, _x2, _x3) {
        return _validateRegister.apply(this, arguments);
      }

      return validateRegister;
    }()
  }, {
    key: "validateLogin",
    value: function () {
      var _validateLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var schema;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                schema = {
                  email: _joi.default.string().email().required(),
                  password: _joi.default.string().min(7).required()
                };
                _context2.next = 4;
                return _joi.default.validate(req.body, schema);

              case 4:
                next();
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: String(_context2.t0.details[0].message),
                  type: 'validation'
                }));

              case 10:
                return _context2.abrupt("return", true);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function validateLogin(_x4, _x5, _x6) {
        return _validateLogin.apply(this, arguments);
      }

      return validateLogin;
    }()
  }]);

  return UserMiddleware;
}();

var _default = UserMiddleware;
exports.default = _default;
//# sourceMappingURL=user.js.map