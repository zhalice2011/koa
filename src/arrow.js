
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
      console.log('id: ',this.id ) // undefined   正确
    }, 50)
  },
  sayWithThis: function() {
    let that = this
    setTimeout(function() {
      console.log('This id: ',that.id ) // 2    正确
    }, 500)
  },
  sayWithArrow: function() {
    setTimeout(() => {
      console.log('Arrow id: ',this.id ) //2    正确
    }, 1500)
  },
  sayWithGlobalArrow: () => {  // 问题解答,因为这个箭头函数在一开始就是了,所以当前的作用域是全局的作用域,而global是没有id的
    setTimeout(() => {
      console.log('Global Arrow id: ',this.id ) //2  这个错误了这是打印出来undefined
    }, 2000)
  },
}

luke.say()
luke.sayWithThis()
luke.sayWithArrow()
luke.sayWithGlobalArrow() // 解:箭头函数中的this指向函数定义的时候所属于的作用域下,而非运行的时候的作用域

