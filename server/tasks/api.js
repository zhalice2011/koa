// 豆瓣api的请求
const rp = require('request-promise-native') // 其实就是用了promise对request进行了封装 就可以支持await来进行调用
// 引入数据表
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMovie(item) {
  console.log('item', item)
  console.log('item.doubanid', item.doubanId)
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`

  const res = await rp(url) // 拿到返回的数据

  let body
   
  try{
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }

  return body

}


;
(async () => {
  // let movies = [{
  //     doubanid: 30135081,
  //     title: '假如动物会摄影',
  //     rate: 8.8,
  //     poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512313881.jpg'
  //   },
  //   {
  //     doubanid: 26910820,
  //     title: '灵魂摆渡·黄泉',
  //     rate: 7.1,
  //     poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512204463.jpg'
  //   }
  // ]

  //查询出所有需要更新的movies
  let movies = await Movie.find({
    $or:[ // $or表示或 以下几种情况满足一种即可  一下几种情况说明数据不完整 需要再查一次
      { summary: {$exists:false} },
      { summary: null },
      { title: '' },
      { year: {$exists:false} }, //年份为空
      { summary: '' },
    ]
  })

  // for ( let i = 0; i < [movies[0]].length; i++) {
  for ( let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)  // 根据
    console.log('movieData',movieData)
    //此时的  movieData = http://api.douban.com/v2/movie/30135081
    // 20180316082041
    // http://api.douban.com/v2/movie/30135081

    // {
    //   "rating": {
    //     "max": 10,
    //     "average": "8.8",
    //     "numRaters": 498,
    //     "min": 0
    //   },
    //   "author": [
    //     {
    //       "name": "Anne Sommerfield"
    //     },
    //     {
    //       "name": "Hannah Ward"
    //     },
    //     {
    //       "name": "Clare Dornan"
    //     },
    //     {
    //       "name": "Matthew Andews"
    //     }
    //   ],
    //   "alt_title": "",
    //   "image": "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2514250178.webp",
    //   "title": "Animals with Cameras",
    //   "summary": "无论它们是在树上，还是在地底，动物们在人类无法接近的地方度过了一半的生命。适合野生动物的定制相机让我们进入一个通常无法到达的世界，通过它们的眼睛揭示出新的科学和以前看不见的动物行为。第一次在地下洞穴拍摄到刚出生的猫鼬幼崽，加入到大西洋的企鹅们的捕猎中，发现黑猩猩家庭的秘密习性。带着相机的动物们为我们的自然世界提供了一个新的视角，让我们可以与世界上最迷人的动物一起吃饭、睡觉和生活。",
    //   "attrs": {
    //     "website": [
    //       "http://www.bbc.co.uk/programmes/b09qqmfz"
    //     ],
    //     "language": [
    //       "英语"
    //     ],
    //     "pubdate": [
    //       "2018-02-01(英国)",
    //       "2018-02-02(中国大陆)"
    //     ],
    //     "title": [
    //       "Animals with Cameras"
    //     ],
    //     "country": [
    //       "英国"
    //     ],
    //     "director": [
    //       "Anne Sommerfield",
    //       "Hannah Ward",
    //       "Clare Dornan",
    //       "Matthew Andews"
    //     ],
    //     "cast": [
    //       "戈登·布坎南 Gordon Buchanan"
    //     ],
    //     "episodes": [
    //       "3"
    //     ],
    //     "movie_duration": [
    //       "48分钟"
    //     ],
    //     "year": [
    //       "2018"
    //     ],
    //     "movie_type": [
    //       "纪录片"
    //     ]
    //   },
    //   "id": "http://api.douban.com/movie/30135081",
    //   "mobile_link": "http://m.douban.com/movie/subject/30135081/",
    //   "alt": "https://movie.douban.com/movie/30135081",
    //   "tags": [
    //     {
    //       "count": 360,
    //       "name": "纪录片"
    //     },
    //     {
    //       "count": 252,
    //       "name": "BBC"
    //     },
    //     {
    //       "count": 160,
    //       "name": "动物"
    //     },
    //     {
    //       "count": 109,
    //       "name": "英国"
    //     },
    //     {
    //       "count": 103,
    //       "name": "自然"
    //     },
    //     {
    //       "count": 81,
    //       "name": "2018"
    //     },
    //     {
    //       "count": 19,
    //       "name": "吴秀波配音"
    //     },
    //     {
    //       "count": 12,
    //       "name": "纪录片指南"
    //     }
    //   ]
    // }
    if(movieData) {
      let tags = movieData.tags || []
      
      movie.tags = movie.tags || []
      movie.summary = movieData.summary || ''
      movie.title = movieData.alt_title || movieData.title || ''
      movie.rawTitle =  movieData.title || ''
      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []
        movie.year = movieData.attrs.year[0] || 2500
        for( let i = 0; i < movie.movieTypes.length; i++) {
          let item =  movie.movieTypes[i]
          //找一下分类有没有进行存储过 
          let cat = await Category.findOne({
            name: item
          })
          // 如果没有存储过的话就
          if (! cat) {
            cat = new Category({
              name: item,
              movies:[movie._id]
            })
          } else { //判断是否保存过这条数据
            if (cat.movies.indexOf(movie._id) === -1) { //如果没有出现
              cat.movies.push(movie._id)
            }
          }
          //保存
          await cat.save()

          //检查完Category 再检查movie
          if (!movie.category) {
            movie.category.push(cat._id)
          } else {
            if(movie.category.indexOf(cat._id) === -1) {
              movie.category.push(cat._id)              
            }
          }
        }

        // 存储上映日期
        let dates =   movieData.attrs.pubdata || []
        let pubdatas = []
        dates.map(item => {
          if(item && item.split('(').length > 0) {
            let parts = item.split('(')
            let date = parts[0]
            let country = '未知'
            if(parts[1]){ // 如果国家存在
              country = parts[1].split(')')[0]
            }
            pubdatas.push({
              date: new Date(date),
              country: country
            })
          }
        })
        movie.pubdata = pubdatas
      }
      tags.forEach(tag => {
        movie.tags.push(tag.name)
      })
      await movie.save()
    }
  }
 
})()



