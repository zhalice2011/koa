// const Router = require('koa-router')
// const router = new Router

const {controller, get, post, put } = require('../lib/decorator')
const { 
  checkPassword
} = require('../service/user') //引入负责user业务的js


@controller('/api/v0/user')
export class userController {
  // 用户登录
  @post('/')
  async login (ctx, next) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password) //接受type year

    //如果用户不存在
    if(!matchData.user) {
      return (ctx.body = {
        success:false,
        err:'用户不存在'
      })
    }

    if(matchData.match) {
      return (ctx.body={
        success: true
      })
    }

    return (ctx.body = {
      success:false,
      err: '密码不正确'
    })
    //挂载到body中进行返回

  }
  // 获取单个电影详情

  
}
