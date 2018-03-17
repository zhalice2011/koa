const { Route } = require('../lib/decorator')
const { resolve } = require('path')

export const router = app => {
  //初始化route
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)
  router.init()
}
