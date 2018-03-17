
// 装饰器

class Boy {
  @speak
  run () {
    console.log('I can run')
  }
}

// 装饰器的target:类   key:方法   descriptor:Object.de
function speak (target, key, descriptor) {
  console.log(target) // 打印Boy
  console.log(key)    // 打印run
  console.log(descriptor)    // 打印descriptor的配置
  
}

// 装饰器的第二种写法
function speak (language){
 return function (target, key, descriptor) {
  console.log(target) // 打印Boy
  console.log(key)    // 打印run
  console.log(descriptor)    // 打印descriptor的配置
  target.language = language // 这样给Boy增加了一个language的属性
 }
}



const luke = new Boy()

luke.run()
