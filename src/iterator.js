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

function *makeIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i] // yield 会把当前循环到的这个值给迭代下去
  }
}
const gen = makeIterator(['吃饭', '睡觉', '打豆豆'])
console.log('all', gen.next())
console.log('1', gen.next().value)
console.log('2', gen.next().value)
console.log('3', gen.next().value)
console.log('4', gen.next().done)
