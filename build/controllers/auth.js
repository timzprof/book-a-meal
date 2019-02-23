"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwt_secret = _interopRequireDefault(require("../util/jwt_secret"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "checkForToken",
    value: function checkForToken(req, res, next) {
      var token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'No Token Provided'
        });
      }

      var jwtToken = token.split(' ')[1];
      req.jwt = jwtToken;
      next();
      return true;
    }
  }, {
    key: "verifyUserToken",
    value: function () {
      var _verifyUserToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var decoded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _jsonwebtoken.default.verify(req.jwt, _jwt_secret.default);

              case 3:
                decoded = _context.sent;
                req.user = decoded.user;
                next();
                return _context.abrupt("return", true);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'Invalid Auth Token'
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function verifyUserToken(_x, _x2, _x3) {
        return _verifyUserToken.apply(this, arguments);
      }

      return verifyUserToken;
    }()
  }, {
    key: "verifyAdminToken",
    value: function () {
      var _verifyAdminToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var decoded;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _jsonwebtoken.default.verify(req.jwt, _jwt_secret.default);

              case 3:
                decoded = _context2.sent;

                if (decoded.isCaterer) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Unauthorized');

              case 6:
                req.caterer = decoded.caterer;
                next();
                return _context2.abrupt("return", true);

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'Unauthorized'
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function verifyAdminToken(_x4, _x5, _x6) {
        return _verifyAdminToken.apply(this, arguments);
      }

      return verifyAdminToken;
    }()
  }]);

  return AuthController;
}();

var _default = AuthController;
exports.default = _default;
//# sourceMappingURL=auth.js.map