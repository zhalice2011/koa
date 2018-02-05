const koa = require('koa')
const logger = require('koa-logger')
const app = new koa()
const ejs = require('ejs')
const pug = require('pug')
const { Tpl,ejsTpl,pugTpl } = require('./tpl')

// 1.传入html模板渲染的中间件

// app.use(async(ctx, next) => {
//   ctx.type = 'text/html; chart="utf-8"'
//   ctx.body = normal
// })

// 2.传入ejs模板渲染的中间件

// app.use(async(ctx, next) => {
//   ctx.type = 'text/html; chart="utf-8"'
//   ctx.body = ejs.render(ejsTpl, {
//     you: 'cherise',
//     me: 'dali'
//   })
// })

// 3.传入ejs模板渲染的中间件

app.use(async(ctx, next) => {
  ctx.type = 'text/html; chart="utf-8"'
  ctx.body = pug.render(pugTpl, {
    you: 'cherise',
    me: 'dali'
  })
})

app.listen('3000',() => console.log('Server in port 3000'))
