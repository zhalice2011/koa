'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Nodejs 8 有一个新的工具函数util.promisify() 他将一个接收回调函数参数的函数转换成一个返回Promise的函数。
var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readAsync((0, _path.resolve)(__dirname, '../package.json'));

          case 2:
            data = _context.sent;

            data = JSON.parse(data);
            console.log(data.name);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

var _util = require('util');

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readAsync = (0, _util.promisify)(_fs2.default.readFile);
init();
//# sourceMappingURL=index.js.map