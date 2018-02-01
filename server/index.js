const koa = require('koa')
const app = new koa()

// 中间件1
const mid1 = async (ctx, next) => {
  ctx.type = 'text/html; charset=utf8'
  await next()
}
// 中间件2
const mid2 = async (ctx, next) => {
  ctx.body = '你好'
  await next()
}
// 中间件3
const mid3 = async (ctx, next) => {
  ctx.body = ctx.body + 'Loser'
  await next()
}

app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(3000)
