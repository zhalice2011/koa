const fs = require('fs')
fs.writeFile()

// es6的语法  

// 运行时加载
const { writeFile } = require('fs')
// 其实这种也是相当于加载了fs 然后从fs中获取writeFile



// 编译时加载 import
import { writeFile } from 'fs'
