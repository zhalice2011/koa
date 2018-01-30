const co = require('co')
const fetch = require('node-fetch')

// co库
// 2.使用co库
// co(function *() {
//   const res = yield fetch('https://api.douban.com/v2/movie/1291843')
//   const movie = yield res.json() //yield对应co库中的一次promise
//   const summary = movie.summary
//   console.log('summary', summary)
// })


// 1.还原co库的执行
function run(generator) {
  const iterator = generator()
  const it = iterator.next()
  const promise = it.value
  promise.then(data => {
    const it2 = iterator.next(data)
    const promise2 = it2.value
    promise2.then(data2 => {
      iterator.next(data2)
    })
  })
}
run (function *() {
  const res = yield fetch('https://api.douban.com/v2/movie/1291843')
  const movie = yield res.json() //yield对应co库中的一次promise
  const summary = movie.summary
  console.log('summary', summary)
}
)
