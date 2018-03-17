const Router = require('koa-router')
const { resolve } = require('path')
const glob = require('glob')
const _ = require('lodash')

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

// 判断是不是数组的方法 如果不是数组封装成数组再返回 _.是lodash的工具方法
const isArray = c => _.isArray(c) ? c : [c]
//装饰器
export class Route {
  //app 是传入的koa的new app对象
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }
  // 加载每个路由文件  初始化每个路由的控制器
  init() {
    // 举例:同步获取指定文件（App_PATH）夹下的文件（全部.js文件） var entryFiles = glob.sync(APP_PATH + '/*.js')
    const models = glob.sync(resolve(this.apiPath,'**/*.js'))
    models.forEach(require) //引入这些routes下面的路由文件js

    // glob.sync(resolve(__dirname, '../database/schema/','**/*.js'))
    //   .forEach(require)
    

    //枚举 routerMap这个map
    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller) //如果不是数组转化成数组
      const prefixPath = conf.target[symbolPrefix]
      if( prefixPath ) prefixPath = normalizePath(prefixPath) //路径格式化
      const routerPath = prefixPath + conf.path //拼接成最终的路径

      //this.router其实就是koa的router
      this.router[conf.method](routerPath, ...controllers) //controllers是中间件  可能有多个所以是数组
    }

    //对上面的应用所有路由的规则
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

// 使规格化   判断是不是/开头的
const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path) //规范化路径

  //使用map的set方法设置key 和 value
  routerMap.set({
    target: target,
    ...conf   // conf里面有 method 和 path
  },target[get])
    

}

// es6的数据类型 Symbol 唯一的数据
export const controller = path => target => (target.prototype[symbolPrefix] = path)


// get获取数据  传入path 调用router方法
export const get = path => router({
  method:'get',
  path:path
})

// post提交 新建一条记录
export const post = path => router({
  method:'post',
  path:path
})

// put修改一条已有的记录
export const put = path => router({
  method:'put',
  path:path
})

// delete删除一条已有的记录
export const del = path => router({
  method:'del',
  path:path
})

// 
export const use = path => router({
  method:'use',
  path:path
})

// 
export const all = path => router({
  method:'all',
  path:path
})





