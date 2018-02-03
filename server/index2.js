const koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const app = new koa()
//设置keys用于的session进行加密
app.keys = ['Hi Dali']

app.use(logger())
// 启动session
app.use(session(app))

// app.use(ctx => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return;
 
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });

//路由
app.use(ctx => {
  if (ctx.path === '/') {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' 次';
  } else if (ctx.path === '/hi') {
    ctx.body = 'HI dali';
    
  } else {
    ctx.body ='404'
  }
})


app.listen(3000,() => console.log('项目运行在3000端口'))
