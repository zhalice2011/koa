import { promisify } from 'util'
import { resolve as r } from 'path'
import fs from 'fs'

const readAsync = promisify(fs.readFile) // Nodejs 8 有一个新的工具函数util.promisify() 他将一个接收回调函数参数的函数转换成一个返回Promise的函数。
async function init() {
  let data = await readAsync(r(__dirname,'../package.json'))
  data = JSON.parse(data)
  console.log(data.name)
}
init()
