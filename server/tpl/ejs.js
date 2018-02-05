module.exports =  `
<!DOCTYPE html>
<html>
  <head>
    <meta chartset="utf-8">
    <meta name="viewport" content="width=device-width",initial-scake=1">
    <title>Koa Server HTML</title>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="row"></div>
      <div class="col-md-8">
        <h1>Hi <%= you %></h1>
        <p>This is <%= me %></p>
      </div>
      <div class="col-md-4">
        <p>测试静态页面</p>
      </div>
    </div>
    <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  </body>
</html>
`
