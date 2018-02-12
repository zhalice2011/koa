// 引入子进程
const cp = require('child_process')
const { resolve } = require('path')

// 自运行函数
;(async () => {
  // 拿到脚本文件
  const script = resolve(__dirname, '../crawler/trailer-list')
  // fork可以弄出一个子进程对象 传入脚本文件和一个空的参数
  const child = cp.fork(script, [])

  let invoked = false // 标识符,判断子进程是否有跑起来


  // 监听进程的错误
  child.on('error', err => {
    if (invoked) return 
    invoked = true
    console.log(err)
  })

  // 监听进程退出
  child.on('exit', code => {
    if (invoked) return
    invoked = true
    
    let err = code === 0 ? null : new Error('exit code' + code)

    console.log(err)
  })

  // 注册监听函数  这个可以收到  process.send({result}) 中传入的data
  child.on('message', data => {
    let result = data.result
    console.log(result)
  })

})()
