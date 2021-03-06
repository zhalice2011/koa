// 电影的数据模型
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    unique:true, // 唯一
    type:String
  },

  category:[{
    type:ObjectId,
    ref: 'Category' //指向关系
  }],

  rate:Number,  // 豆瓣评分
  title: String, // 标题
  summary: String,
  video: String,
  poster: String,
  cover: String, // 封面

  videoKey: String,
  posterKey: String, // 七牛的key
  coverKey: String,
  
  rawTitle: String, //初始的标题
  movieTypes: [String], // 类型
  pubDate: Mixed, //上映日期
  year:Number,  // 上映年份
  tags:Array, // 标签
  meta: { // 变化
    createdAt: { // 创建时间
      type: Date,
      default: Date.now()
    },
    updatedAt: { // 创建时间
      type: Date,
      default: Date.now()
    }
  }
})

//数据保存之前的中间件
movieSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Movie', movieSchema)  // 把模型发布出去
