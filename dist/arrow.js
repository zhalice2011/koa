'use strict';

// 箭头函数 特点一.代码精简

var arrow1 = function arrow1(param) {};
var arrow2 = function arrow2(param) {};

var arrow3 = function arrow3(param) {
  return console.log(param);
};

var arrow4 = function arrow4(param) {
  return { a: 1, b: 2 };
};

// 传入的是一个对象{id: 2, movie: 4}
var arrow5 = function arrow5(_ref) {
  var id = _ref.id,
      movie = _ref.movie;
  return console.log(id, movie);
};

// 箭头函数 特点二.this

var luke = {
  id: 2,
  say: function say() {
    setTimeout(function () {
      console.log('id: ', this.id); // undefined   正确
    }, 50);
  },
  sayWithThis: function sayWithThis() {
    var that = this;
    setTimeout(function () {
      console.log('This id: ', that.id); // 2    正确
    }, 500);
  },
  sayWithArrow: function sayWithArrow() {
    var _this = this;

    setTimeout(function () {
      console.log('Arrow id: ', _this.id); //2    正确
    }, 1500);
  },
  sayWithGlobalArrow: function sayWithGlobalArrow() {
    // 问题解答,因为这个箭头函数在一开始就是了,所以当前的作用域是全局的作用域,而global是没有id的
    setTimeout(function () {
      console.log('Global Arrow id: ', undefined.id); //2  这个错误了这是打印出来undefined
    }, 2000);
  }
};

luke.say();
luke.sayWithThis();
luke.sayWithArrow();
luke.sayWithGlobalArrow(); // 解:箭头函数中的this指向函数定义的时候所属于的作用域下,而非运行的时候的作用域
//# sourceMappingURL=arrow.js.map