//处理跟登录 和 后台相关的操作
const mongoose = require('mongoose')
const User = mongoose.model('User')


// 检查摩玛是否正确
export const checkPassword = async (email, password) => {
  let match = false
  // 查询
  const user = await User.findOne({ email })

  if(user) {
    //如果用户存在 进行密码比较
    match = await user.comparePassword(password, user.password)
  }

  return {
    match,
    user
  }
  
}
