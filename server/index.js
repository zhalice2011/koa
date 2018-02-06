const koa = require('koa')
const logger = require('koa-logger')
const app = new koa()
const views = require('koa-views')
const { resolve } = require('path')



 

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async(ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'Scott'
  })
})

app.listen('3000',() => console.log('Server in port 3000'))
