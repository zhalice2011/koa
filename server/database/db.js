const mongoose = require("mongoose")
const db = 'mongodb://localhost/douban-trailer'  // 定义数据库地址
const glob = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise  // 使用nodeJS原生的promise替代mongoose内置的promise

// 暴露所有的schema
exports.initSchemas = () => {
  //匹配schema下面所有的js文件
  glob.sync(resolve(__dirname, './schema', '**/*.js')) //同步拿到所有的js文件  返回的是一个数组
    .forEach(require)
}

// 暴露连接函数
exports.connect = () => {
  let maxConnectTimes = 0 //统计连接的次数

  // 返回promise 为了让连接数据库成功之后才去执行后面的代码
  return new Promise((resolve, reject) => {
    // 判断是否是生产环境
    if(process.env.NODE_ENV !== 'production') { 
      mongoose.set('debug', true) // 开发环境开启debug
    }
    // 连接数据库
    mongoose.connect(db)
    // 监听数据库连接中断
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      //断开连接就重新连接
      if (maxConnectTimes < 5) {
        mongoose.connect(db)            
      } else {
        throw new Error('数据库挂了')  //抛出错误
      }
    })

    // 监听数据库连接错误
    mongoose.connection.on('error', err => {
      maxConnectTimes++
      //断开连接就重新连接
      if (maxConnectTimes < 5) {
        mongoose.connect(db)            
      } else {
        throw new Error('数据库挂了')  //抛出错误
      }
    })

    // 监听数据库连接首次连接
    mongoose.connection.once('open', () => {
      // 模拟mongoose保存数据的过程
      // const Dog = mongoose.model('Dog', {name: String})
      // const dogA = new Dog({ name: '阿尔噶'})
      // dogA.save().then(() => {
      //   console.log('汪汪')
      // })

      resolve()
      console.log('Mongodb Connected Successfully')  
    })
  })



}


