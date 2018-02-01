# koa
Koa2 预告片网站



koa express

最核心的就是处理HTTP请求
  接受
  解析
  响应

中间件(Middlewares) -- 对

执行上下文(Context) -- 串联这些东西的执行步骤

compose : 中间件数组处理

context : 包括req 和 res
  1.实际是把req和res的所有方法都挂载到了ctx上面
  2.Object.create //生成一个新的对象
request.js :  

Emitter : 触发函数和捕捉函数

assert : 断言

Stream : 持续的流动的数据

Application 暴露一个类别继承Emitter
  a.通过new的koa实例传入中间件 监听端口 生成一个服务器实例
  b.拿到http的req请求,在让这个请求逐层过中间件(compose(this.middleware))
  c.最后吧compose完的结果交给处理响应的函数handleReponse,最后返回内容

