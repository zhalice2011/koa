const koa = require('koa')
const logger = require('koa-logger')
const app = new koa()


// 中间件1
const mid1 = async (ctx, next) => {
  ctx.body = '你好'
  
  await next()
  
  ctx.body = ctx.body + '这里'
  
}
// 中间件2
const mid2 = async (ctx, next) => {
  ctx.type = 'text/html; charset=utf8'
  
  await next()
}
// 中间件3
const mid3 = async (ctx, next) => {
  ctx.body = ctx.body + 'Loser'
  await next()
}

function pure(x) {
  return x + 1
}

// function tail(i) {
//   if (i > 3) return 
//   console.log('修改前', i)
//   tail(i + 1)
//   console.log('修改后', i)
// }
// tail(0)
function tail2(i) {
  if (i > 3) return 
  console.log('修改前', i)
  return tail2(i + 1)
  console.log('修改后', i)
}
tail2(0)

app.use(logger())


app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(3000)
