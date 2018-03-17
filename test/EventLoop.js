//定时器阶段

//文件读写的这个IO操作的阶段

//setImmediate阶段  


const { readFile, readFlieSync } = require('fs')

setImmediate(() => console.log('阶段三Immediate 的回调1'))
setImmediate(() => console.log('阶段三Immediate 的回调2'))
setImmediate(() => console.log('阶段三Immediate 的回调3'))


Promise.resolve(() => {
  console.log('promise 的回调1')
  setImmediate(() => console.log('Promise中增加的 阶段三Immediate 的回调4'))
  
})

readFile('../package.json','utf-8',data => {
  console.log('阶段二IO操作 的回调1')

  readFile('../package-lock.json','utf-8',data => {
    console.log('阶段二IO操作 的回调2')
    setImmediate(() => console.log('阶段二IO操作 的回调2总增加的 阶段三Immediate 的回调5'))
    
  })
})

setTimeout(function() {
  console.log('阶段一定时器 1')
  process.nextTick(() => {
    console.log('...待切入下一个阶段 process.nextTick 回调5')
  })
},0)

setTimeout(function() {
  console.log('阶段一定时器 2')
  
},0)
setTimeout(function() {
  console.log('阶段一定时器 3')
},0)
setTimeout(function() {
  console.log('阶段一定时器 4')
},0)

process.nextTick(() => {
  console.log('...待切入下一个阶段 process.nextTick 回调1')
})
process.nextTick(() => {
  console.log('...待切入下一个阶段 process.nextTick 回调2')
})
process.nextTick(() => {
  console.log('...待切入下一个阶段 process.nextTick 回调3')
  process.nextTick(() => {
    console.log('...待切入下一个阶段 process.nextTick 回调3')
  })
})
