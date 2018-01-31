'use strict';

var fs = require('fs');
// const Promise = require('bluebird')

// 1.第一种写法  过度时期的代码
// fs.readFile('./package.json', (err, data) => {
//     if (err) return console.log(err)
//     data = JSON.parse(data)
//     console.log(data.name)
// })


// 2.第二种写法  过度时期的代码

// function readFileAsync(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if (err) reject(err)
//             else resolve(data)
//         })
//     })
// }

// readFileAsync('./package.json')
//     .then(data => {
//         data = JSON.parse(data)
//         console.log(data.name)
//     })
//     .catch(err => {
//         console.log(err)
//     })


// 3.node8提供了util
var util = require('util');

// 传入一个回调函数返回的是一个promise的fuc  fs.readFile是一个回调的异步函数
util.promisify(fs.readFile)('./package.json').then(JSON.parse).then(function (data) {
    console.log(data.name);
}).catch(function (err) {
    console.log(err);
});
//# sourceMappingURL=cb-promise.js.map