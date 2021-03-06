const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10 // 盐的长度  越长计算机消耗的计算力越大
const MAX_LOGIN_ATTEMPTS = 5  // 最大登录失败次数
const LOCK_TIME = 2 * 60 * 60 * 1000 // 锁定时间 2个小时
const Schema = mongoose.Schema

const userSchema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  username: String, // 用户名
  email: String, // 邮箱
  password: String, // 密码
  hashed_password: String, // 加密密码
  loginAttempts: { //用户尝试登录的次数
    type: Number,
    required: true, //不能为空
    default: 0
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// 虚拟字段 这个字段不会存入数据库中  lockUntil是要被锁定到什么时候
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now()) //判断是否锁定时间在这个时间
})

//数据保存之前的中间件
userSchema.pre('save', function(next) {
  // 密码是否更改
  if (this.isModified('password')) return  next()

  // 密码加盐
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next() 
    }) 
  })

  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

// 给userSchema增加一些实例方法 ---- methods
userSchema.methods = {
  comparePasswordL: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttempts: (user) => {
    return new Promise((resolve, reject) => {
      if(this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set:{
            loginAttempts:1
          },
          $unset: {
            lockUntil:1
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      }else {
        let updates = {
          $inc: {
            loginAttempts:1
          }
        }
        if (loginAttempts +1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) { //如果登录失败次数大于5次 并且当前用户没有被锁定
          
        }
      }
    })
  
  }
}








userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

userSchema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)

      user.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function (err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  // 判断当前用户是否超过登录次数
  incLoginAttempts: function (user) {
    const that = this

    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) { //如果已经锁定 不过已经过期了
        that.update({
          $set: {
            loginAttempts: 1  //登录次数
          }, 
          $unset: {
            lockUntil: 1
          }
        }, function (err) {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }

        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME //设置成当前时间+需要锁定的时间
          }
        }

        that.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

mongoose.model('User', userSchema)
