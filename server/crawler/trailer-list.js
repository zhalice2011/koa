const puppeteer = require('puppeteer')

//声明要爬取的地址
const url = `https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=`

// 定义一个promise的定时函数
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})


// 自运行函数
;(async () => {
  console.log(`Start visit the target page`)
  // 1.配置浏览器参数
  const browser = await puppeteer.launch({
    headless: true, // 可以让他打开网页
    executablePath:'/private/var/folders/0c/r32jpgps1q31hmn8r4lb_r080000gn/T/AppTranslocation/29D8041E-2DF9-4AAA-97BE-36C80CFB6509/d/Chromium.app/Contents/MacOS/Chromium',
    args: ['--allow-no-sandbox-job'], // --allow-no-sandbox-job:这个标志可以减少的安全沙箱进程和允许他们做某些API调用关闭窗口或访问剪贴板。我们也失去了机会杀死一些过程,直到外拥有他们完成的工作
    dumpio: false // 浏览器是否管过程stdout和stderr进的过程。stdout和process.stderr。默认值为false
  })

  // 2.开启新的页面
  const page = await browser.newPage()
  // 3.打开要爬取的页面
  await page.goto(url, {
    waitUntil: 'networkidle0'  // 考虑网络没有超过0时完成网络连接至少500 ms。
  })
  // 4.做个延时 等待3000毫秒
  await sleep(1000)

  // 5.页面加载完这个加载更多的元素
  await page.waitForSelector('.more')

  for (let i = 0; i < 1; i++) {
    await sleep(1000)
    console.log('点击加载更多')
    await page.click('.more')  // 点击加载更多
  }
  console.log('any one?')
  // 6.分析网页结构 获取想要的数据  在page.evaluate里面的东西呢都是
  const result = await page.evaluate(() => {
    console.log('有人吗')
    var $ = window.$   // 获取全局对象$ 其实就是jq  ps:这个页面有jq才能拿到没有的话就无法拿到
    var items = $('.list-wp a') // 获取所有的
    var links = []
    console.log('items的数量', items.length)
    if  (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')  // 拿到id
        let title = it.find('.title').text()  // 拿到标题
        let rate = Number(it.find('.rate').text())  // 评分 转化成数值
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio') // 获取图片地址

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    console.log('links', links)
    return links
  })
  console.log('result=',result)
  // 7.关闭浏览器
  browser.close()

  // 发送到这个进程中  把打印的结果发送出去
  process.send({result})
  // 让这个进程退出
  process.exit(0)

})()



