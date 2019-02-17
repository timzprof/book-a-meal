"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var secret = process.env.JWT_SECRET;
var _default = secret;
exports.default = _default;
//# sourceMappingURL=jwt_secret.js.map