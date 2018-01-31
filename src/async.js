// 处理异步函数
const fs = require('fs')

// 1.最原始的异步操作 通过回调函数
// 1.1定义函数
function readFile(cb) {
  fs.readFile('./package.json', (err, data) => {
    if (err) return cb(err)
    cb(null, data)
  })
}
// 1.2调用函数 (传入一个回调函数)
readFile((err, data) => {
  if (!err) {
    data = JSON.parse(data)
    console.log(data.name)
  }
})


// 2.第二个阶段 Promise
// 2.1定义函数
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
// 2.2调用函数
readFileAsync('./package.json')
  .then(data => {
    data = JSON.parse(data)
    console.log(data.name)
  })
  .catch(err => {
    console.log(err)
  })


// 3.第三个阶段 co + generator函数 +promise
const co = require('co')
const util = require('util')
co(function *() {
  let data = yield util.promisify(fs.readFile)('./package.json')
  data = JSON.parse(data)
  console.log(data.name)
})



// 4.第四个阶段 Async 一统江湖
const readAsync = util.promisify(fs.readFile) // Nodejs 8 有一个新的工具函数util.promisify() 他将一个接收回调函数参数的函数转换成一个返回Promise的函数。
async function init() {
  let data = await readAsync('./package.json')
  data = JSON.parse(data)
  console.log(data.name)
}
init()




