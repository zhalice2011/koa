const fs = require('fs')
const util = require('util')

//对异步函数readFile进行promisify包装
const readAsync = util.promisify(fs.readFile)
// 定义一个async function
async function init() {
  try {
    let data = await readAsync('./package.json')
    data = JSON.parse(data)
    console.log(data.name)
  } catch (err) {
    console.log(err)
  }
}
init()
