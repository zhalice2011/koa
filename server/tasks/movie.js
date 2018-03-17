// 引入子进程
const cp = require('child_process')
const { resolve } = require('path')
// 引入数据表
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

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
    console.log('有人吗3')
    
    console.log(err)
  })

  // 监听进程退出
  child.on('exit', code => {
    if (invoked) return
    invoked = true
    console.log('有人吗2')
    let err = code === 0 ? null : new Error('exit code' + code)

    console.log(err)
  })

  // 注册监听函数  这个可以收到  process.send({result}) 中传入的data
  // child.on('message', data => {
  //   let result = data.result
  //   console.log('有人吗',result)
    
  //   // 遍历result
  //   // result.forEach(async item => {
  //   //   // 根据item.doubanId查询
  //   //   let movie = await Movie.findOne({
  //   //     doubanId = item.doubanId
  //   //   })
  //   //   // 如果没有存储过
  //   //   if (!movie) {
  //   //     movie = new Movie(item)
  //   //     await movie.save()
  //   //   }
  //   // })
  // })

  child.on('message', data => {
    let result = data.result
    console.log('有人吗',result)
    result.forEach(async (item) => {
      let movie = await Movie.findOne({
        doubanId: item.doubanId
      }).exec()

      if (!movie) {
        movie = new Movie(item)
        await movie.save()
      }
    })
  })
})()
