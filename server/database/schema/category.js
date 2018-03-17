// 电影的数据模型
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
  name: {
    unique:true,
    type:String
  },
  movies:[{
    type:ObjectId,
    ref: 'Movie' //指向关系
  }],
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
categorySchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Category', categorySchema)  // 把模型发布出去
