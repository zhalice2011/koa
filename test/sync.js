// 模拟代码中同步执行的过程
const doSync = (sth, time) => new Promise(resolve => {
  setTimeout(() => {
    console.log(sth + '用了' + time + '毫秒')
    resolve()
  }, time)
})

// 模拟代码中异步执行的过程
const doAsync = (sth, time, cb) => {
  setTimeout(() => {
    console.log(sth + '用了' + time + '毫秒')
    cb && cb()  // 判断如果有回调的话执行回调函数
  }, time)
}

// 做其他事
const doElse = (sth) => {
  console.log(sth)
}

const Dali = {doAsync, doSync}
const Meizi = {doAsync, doSync, doElse}

;(async () => {
  console.log('case 1: 妹子来到门口')
  await Dali.doSync('Dali 刷牙', 1000)
  console.log('啥也没干, 一直在等')
  await Meizi.doSync('妹子洗澡', 2000)
  Meizi.doElse('妹子去忙别的了')


  console.log('case 3: 妹子来到门口按下等待通知开关')
  Dali.doAsync('Dali 刷牙', 1000, () => {
    console.log('卫生间通知妹子来洗澡')
    Meizi.doSync('妹子洗澡', 2000)
  })
  Meizi.doElse('妹子去忙别的了')
  
})()
