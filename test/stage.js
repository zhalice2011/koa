
const { readFile } = require('fs')
const EventEmitter = require('events') //EventEmitter 的核心就是事件触发与事件监听器功能的封装。


class EE extends EventEmitter {
  
}
const yy = new EE()

//给yy添加一个监听的函数
yy.on('event', () => {
  console.log("出大事了")
  
})

setTimeout(() => {
  console.log('0毫秒后执行的定时器回调函数')
},0)

setTimeout(() => {
  console.log('100毫秒后执行的定时器回调函数')
},100)

setTimeout(() => {
  console.log('200毫秒后执行的定时器回调函数')
},200)

//通过readFile异步读取一个文件
readFile('../package.json','utf-8',data => {
  console.log('完成文件 1 读取操作的回调')
})

readFile('../README.md','utf-8',data => {
  console.log('完成文件 2 读取操作的回调')
})

setImmediate(() => {
  console.log('Immediate立即执行回调')
})

// 插入?
process.nextTick(() => {
  console.log('process.nextTick的第一次回调')  
})

Promise.resolve()
  .then(() => {
    yy.emit('event') //触发一次这个时间

    process.nextTick(() => {
      console.log('process.nextTick的第二次回调')  
    })

    console.log('Promise的第一次回调')
  })
  .then(() => {
    console.log('Promise的第二次回调')
  })
