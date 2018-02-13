// 上传静态资源到七牛云服务器

const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
// 定义好其中鉴权对象mac
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
// 构建一个上传用的config对象,在该对象中，可以指定空间对应的zone以及其他的一些影响上传的参数
const qiniuConfig = new qiniu.conf.Config();
// 资源管理相关的操作首先要构建BucketManager对象：
const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    bucketManager.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({key})
        } else {
          reject(info)
        }
      }
    })
  })
}


;(async () => {
  let movies = [
    { 
      video: 'http://vt1.doubanio.com/201802131251/58e97b2603a398a5678e19ec0ce9d0a5/view/movie/M/302190491.mp4',
      doubanId: '26739551',
      cover: 'https://img1.doubanio.com/img/trailer/medium/2493603388.jpg?',
      poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2504474084.webp' 
    }
  ]
  // 遍历movies
  movies.map(async movie => {
    if (movie.video && !movie.key) { //就执行上传操作
      try {
        console.log('开始传video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传cover, videoData=', videoData)
        
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        console.log('开始传poster,coverData =', coverData)
        console.log('movie.poster', movie.poster)
        
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
        console.log('都结束了posterData',posterData)
        if (videoData.key) { // 有key就说明上传成功了
          movie.videoKey = videoData.key
        }
        if (coverData.key) { // 有key就说明上传成功了
          movie.coverKey = coverData.key
        }
        if (posterData.key) { // 有key就说明上传成功了
          movie.posterKey = posterData.key
        }
        console.log(movie)
        // { video: 'http://vt1.doubanio.com/201802131251/58e97b2603a398a5678e19ec0ce9d0a5/view/movie/M/302190491.mp4',
        // doubanId: '26739551',
        // cover: 'https://img1.doubanio.com/img/trailer/medium/2493603388.jpg?',
        // poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2504474084.webp',
        // videoKey: 'http://video.lovezhishu.cn/j2JkXSk5Txm6l6sAI1BUP.mp4',
        // coverKey: 'http://video.lovezhishu.cn/pU~NgSGz12df6zmyaY2Dz.png',
        // posterKey: 'http://video.lovezhishu.cn/Jkr4NXpUl88bXc9QXmB~c.png' }
        
        
        // 上传成功  访问地址:http://video.lovezhishu.cn/bXrbunK2JZ5GtuTqJfGfv.mp4



      } catch (err) {
        console.log(err)
      }
    }
  })
})()
