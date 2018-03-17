// const Router = require('koa-router')
// const router = new Router

const {controller, get, post, put } = require('../lib/decorator')
const { 
  getAllMovies,
  getMovieDetail,
  getRelativeMovies
} = require('../service/movie') //引入负责业务的函数
@controller('/api/v0/movies')
export class movieController {
  // 获取所有的电影列表
  @get('/')
  async getMovies (ctx, next) {
    const {type, year} = ctx.query
    const movies = await getAllMovies(type, year) //接受type year

    //挂载到body中进行返回
    ctx.body = {
      movies
    }
  }
  // 获取单个电影详情
  @get('/:id')
  async getMovieDetail (ctx, next)  {
    // const Movie = mongoose.model('Movie')
    
    // const id = ctx.params.id // 拿到id
    // //拿到所有的movie  然后sort根据时间排序
    // const movie = await Movie.findOne({_id:id})

    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)
    //挂载到body中进行返回
    ctx.body = {
      data:{
        movie,
        relativeMovies
      },
      success:true
    }
  }
}
