// 豆瓣api的请求
const rp = require('request-promise-native') // 其实就是用了promise对request进行了封装 就可以支持await来进行调用

async function fetchMovie(item) {
  console.log('item', item)
  console.log('item.doubanid', item.doubanid)
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanid}`

  const res = await rp(url) // 拿到返回的数据

  return res

}


;
(async () => {
  let movies = [{
      doubanid: 30135081,
      title: '假如动物会摄影',
      rate: 8.8,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512313881.jpg'
    },
    {
      doubanid: 26910820,
      title: '灵魂摆渡·黄泉',
      rate: 7.1,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512204463.jpg'
    }
  ]

  //遍历数组
  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    console.log(movieData)
    try {
      movieData = JSON.parse(movieData)
    } catch (err) {
      console.log(err)
    }
  })
  // const process = xiuni
})()


{
  "rating": {
    "max": 10,
    "average": 7.1,
    "stars": "35",
    "min": 0
  },
  "reviews_count": 296,
  "wish_count": 4584,
  "douban_site": "",
  "year": "2018",
  "images": {
    "small": "http://img7.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2512204463.jpg",
    "large": "http://img7.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2512204463.jpg",
    "medium": "http://img7.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2512204463.jpg"
  },
  "alt": "https:\/\/movie.douban.com\/subject\/26910820\/",
  "id": "26910820",
  "mobile_url": "https:\/\/movie.douban.com\/subject\/26910820\/mobile",
  "title": "\u7075\u9b42\u6446\u6e21\u00b7\u9ec4\u6cc9",
  "do_count": null,
  "share_url": "http:\/\/m.douban.com\/movie\/subject\/26910820",
  "seasons_count": null,
  "schedule_url": "",
  "episodes_count": null,
  "countries": ["\u4e2d\u56fd\u5927\u9646"],
  "genres": ["\u60ac\u7591", "\u5947\u5e7b", "\u60ca\u609a"],
  "collect_count": 16589,
  "casts": [{
    "alt": "https:\/\/movie.douban.com\/celebrity\/1317344\/",
    "avatars": {
      "small": "http://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p39519.jpg",
      "large": "http://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p39519.jpg",
      "medium": "http://img3.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p39519.jpg"
    },
    "name": "\u4e8e\u6bc5",
    "id": "1317344"
  }, {
    "alt": "https:\/\/movie.douban.com\/celebrity\/1366248\/",
    "avatars": {
      "small": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1482669679.63.jpg",
      "large": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1482669679.63.jpg",
      "medium": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1482669679.63.jpg"
    },
    "name": "\u4f55\u82b1",
    "id": "1366248"
  }, {
    "alt": "https:\/\/movie.douban.com\/celebrity\/1376911\/",
    "avatars": {
      "small": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1499761376.23.jpg",
      "large": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1499761376.23.jpg",
      "medium": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p1499761376.23.jpg"
    },
    "name": "\u738b\u745e\u660c",
    "id": "1376911"
  }, {
    "alt": "https:\/\/movie.douban.com\/celebrity\/1313591\/",
    "avatars": {
      "small": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p18912.jpg",
      "large": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p18912.jpg",
      "medium": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p18912.jpg"
    },
    "name": "\u5cb3\u4e3d\u5a1c",
    "id": "1313591"
  }],
  "current_season": null,
  "original_title": "\u7075\u9b42\u6446\u6e21\u00b7\u9ec4\u6cc9",
  "summary": "\u9ec4\u6cc9\u516b\u767e\u91cc\u6c99\u6d77\uff0c\u5bc2\u5bde\u8352\u51c9\uff0c\u65e0\u82b1\u65e0\u53f6\u3002\u5c11\u5973\u4e09\u4e03\u4f5c\u4e3a\u8fd9\u9ec4\u6cc9\u4e2d\u7684\u6700\u540e\u4e00\u4efb\u5b5f\u5a46\uff0c\u88ab\u51a5\u738b\u963f\u8336\u6307\u5a5a\u7ed9\u9b3c\u5dee\u8d75\u540f\u3002\u4e09\u4e03\u6027\u683c\u61a8\u50bb\uff0c\u6837\u8c8c\u67af\u69c1\uff0c\u60c5\u7aa6\u672a\u5f00\uff0c\u906d\u5230\u4e86\u8d75\u540f\u7684\u62d2\u7edd\u3002\u5979\u65e5\u65e5\u72ec\u5b88\u5728\u7a7a\u65f7\u7684\u571f\u5821\u5185\uff0c\u71ac\u7740\u82e6\u6da9\u7684\u5b5f\u5a46\u6c64\uff0c\u53ea\u4e0e\u4e00\u682a\u5c06\u6b7b\u672a\u6b7b\u7684\u66fc\u73e0\u6c99\u534e\u76f8\u4f34\u3002\u76f4\u5230\u90a3\u4e00\u65e5\uff0c\u4e00\u4e2a\u540d\u53eb\u957f\u751f\u7684\u5c11\u5e74\uff0c\u8bef\u6253\u8bef\u649e\u95ef\u8fdb\u4e86\u5b5f\u5a46\u5e84\u2026\u2026",
  "subtype": "movie",
  "directors": [{
    "alt": "https:\/\/movie.douban.com\/celebrity\/1317055\/",
    "avatars": {
      "small": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p38393.jpg",
      "large": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p38393.jpg",
      "medium": "http://img7.doubanio.com\/view\/celebrity\/s_ratio_celebrity\/public\/p38393.jpg"
    },
    "name": "\u5de8\u5174\u8302",
    "id": "1317055"
  }],
  "comments_count": 7929,
  "ratings_count": 16040,
  "aka": ["\u7075\u9b42\u6446\u6e21\u5927\u7535\u5f71", "\u7075\u9b42\u6446\u6e21 \u7535\u5f71\u7248", "\u7075\u9b42\u6446\u6e21\u00b7\u9ec4\u6cc9\u7bc7"]
}
