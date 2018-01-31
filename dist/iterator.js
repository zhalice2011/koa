'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(makeIterator);

// iterator迭代器

// 1.原始的迭代器生成函数

// function makeIterator(arr) {
//   let nextIndex = 0

//   // 返回一个迭代器对象
//   return {
//     // next方法返回的结果对象
//     next: () => {
//       if (nextIndex < arr.length) {
//         return {
//           value: arr[nextIndex++],
//           done: false
//         }
//       }else {
//         return { done: true }
//       }
//     }
//   }
// }

// const it = makeIterator(['吃饭', '睡觉', '打豆豆'])

// console.log('1', it.next().value)
// console.log('2', it.next().value)
// console.log('3', it.next().value)
// console.log('4', it.next().done)


// 2.node中的  *  迭代器生成函数

function makeIterator(arr) {
  var i;
  return _regenerator2.default.wrap(function makeIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < arr.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return arr[i];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}
var gen = makeIterator(['吃饭', '睡觉', '打豆豆']);
console.log('all', gen.next());
console.log('1', gen.next().value);
console.log('2', gen.next().value);
console.log('3', gen.next().value);
console.log('4', gen.next().done);
//# sourceMappingURL=iterator.js.map