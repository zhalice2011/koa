const koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const views = require('koa-views')
const R = require('ramda')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/db')

// 连接数据库的自运行函数
;(async () => {
  //连接数据库
  await connect()
  //初始化所有的schema
  initSchemas()
  //测试数据表查询
  // const Movie = mongoose.model('Movie')

  // const movies = await Movie.find({})
  // console.log('movies', movies)

  //引入爬取电影然后存储的脚本
  //require('./tasks/movie')
  //引入同步豆瓣api
  // require('./tasks/api')
  const app = new koa()
  
  await useMiddlewares(app)
  
  app.listen('3000',() => console.log('Server in port 3000'))

})()

// 中间件数组 
const MIDDLEWARES = ['router']

// 实现加载中间件数组的功能
const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

// async function start() {

  
// }

// start()

