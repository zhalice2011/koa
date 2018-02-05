const koa = require('koa')
const logger = require('koa-logger')
const app = new koa()
const { normal } = require('./tpl')

// 传入中间件
app.use(async(ctx, next) => {
  ctx.type = 'text/html; chart="utf-8"'
  ctx.body = normal
})

app.listen('3000')
