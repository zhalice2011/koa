async function testAsync() {
  return "hello async";
}


// 经过async生命 此时的result是一个promise对象
const result = testAsync();  
console.log(result);  // 输出  Promise { 'hello async' }

// Promise对象中的值需要通过.then来获取
testAsync().then(v => {
  console.log("v",v)  // 输出  v hello async
})



function getSomething() {
  return "something";
}

async function testAsync() {
  return Promise.resolve("hello async");
}

async function test() {
  const v1 = await getSomething();
  const v2 = await testAsync();
  console.log(v1, v2);
}

test();
