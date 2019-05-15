const Koa = require('koa');
const fs = require('fs')
const app = new Koa();
const path = require('path')
function readFileAsync (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      resolve(data)
    });
  })
}
// 当前模块文件的带有完整绝对路径的文件名
console.log(__filename) // E:\chwech\fetchClass\http.js
// 当前文件所在目录的完整目录名
console.log(__dirname) // E:\chwech\fetchClass
app.use(async (ctx, next) => {
  console.log(ctx.path)
  // 静态资源处理
  const publicDir = path.resolve(__dirname, 'static')
  const fileName = path.join(publicDir, ctx.path)
  console.log(fileName)
  if (ctx.url.endsWith('js')) {
    const fileContent = await readFileAsync(fileName)
    ctx.type = 'application/javascript'
    ctx.body = fileContent
  } else if (ctx.url.endsWith('css')) {
    const fileContent = await readFileAsync(fileName)
    ctx.type = 'text/css'
    ctx.body = fileContent
  } else if (ctx.path === '/') {
    const fileContent = await readFileAsync('static/index.html')
    ctx.type = 'html'
    ctx.body = fileContent
  } else {
    await next()
  }
});
app.use(async ctx => {
  if (ctx.path === '/test') {
    ctx.type = 'json'
    ctx.body = JSON.stringify({
      code: 200,
      data: { a: 1 },
      message: 'ok'
    })
  }
})
app.listen(3000)
console.log('listen at port 3000')
