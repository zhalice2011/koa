import { setTimeout } from "timers";

// 箭头函数 特点一.代码精简

const arrow1 = function(param) {

}
const arrow2 = (param) => {

}

const arrow3 = param => console.log(param)

const arrow4 = param => ({a: 1, b: 2})

// 传入的是一个对象{id: 2, movie: 4}
const arrow5 = ({id, movie}) => console.log(id, movie)


// 箭头函数 特点二.this

const luke = {
  id: 2,
  say: function() {
    setTimeout(function() {
      console.log('id: ',this.id )
    }, 50)
  },
  sayWithThis: function() {
    let that = this
    setTimeout(function() {
      console.log('This id: ',that.id )
    }, 500)
  },
  sayWithArrow: function() {
    setTimeout(() => {
      console.log('Arrow id: ',this.id )
    }, 1500)
  },
  sayWithGlobalArrow: () => {
    setTimeout(() => {
      console.log('Global Arrow id: ',this.id )
    }, 2000)
  },
}

luke.say()
luke.sayWithThis()
luke.sayWithArrow()
luke.sayWithGlobalArrow()
