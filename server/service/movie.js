// 负责业务逻辑  其实就是跟数据库进行交互
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

// 获取所有电影列表
export const getAllMovies = async (type, year) => {
  let query = {} // findcase

  if(type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if(year) {
    query.year = year
  }
  
  //执行查询操作
  const movies = await Movie.find(query)
  //返回数据
  return movies
}

// 获取单个电影详情
export const getAllMovies = async (id) => {
  const movie = await Movie.findOne({_id:id})
  //返回数据
  return movie
}

// 获取同类的推荐电影
export const getRelativeMovies = async (movie) => {
  //执行查询操作
  const movies = await Movie.find({
    movieTypes:{
      $in:movie.movieTypes
    }
  })
  //返回数据
  return movies
}
