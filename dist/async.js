'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

// Nodejs 8 有一个新的工具函数util.promisify() 他将一个接收回调函数参数的函数转换成一个返回Promise的函数。
var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readAsync('./package.json');

          case 2:
            data = _context2.sent;

            data = JSON.parse(data);
            console.log(data.name);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 处理异步函数
var fs = require('fs');

// 1.最原始的异步操作 通过回调函数
// 1.1定义函数
function readFile(cb) {
  fs.readFile('./package.json', function (err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
}
// 1.2调用函数 (传入一个回调函数)
readFile(function (err, data) {
  if (!err) {
    data = JSON.parse(data);
    console.log(data.name);
  }
});

// 2.第二个阶段 Promise
// 2.1定义函数
function readFileAsync(path) {
  return new _promise2.default(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}
// 2.2调用函数
readFileAsync('./package.json').then(function (data) {
  data = JSON.parse(data);
  console.log(data.name);
}).catch(function (err) {
  console.log(err);
});

// 3.第三个阶段 co + generator函数 +promise
var co = require('co');
var util = require('util');
co( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var data;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return util.promisify(fs.readFile)('./package.json');

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

// 4.第四个阶段 Async 一统江湖
var readAsync = util.promisify(fs.readFile);
init();
//# sourceMappingURL=async.js.map