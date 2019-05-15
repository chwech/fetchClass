const Koa = require('koa');
const fs = require('fs')
const app = new Koa();
function readFileAsync (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      resolve(data)
    });
  })
}
app.use(async ctx => {
  // 静态资源处理
  if (ctx.url.endsWith('js')) {
    const fileContent = await readFileAsync('request.js')
    ctx.type = 'application/javascript'
    ctx.body = fileContent
  } else if (ctx.url.endsWith('css')) {
    const fileContent = await readFileAsync('index.css')
    ctx.type = 'text/css'
    ctx.body = fileContent
  } else {
    const fileContent = await readFileAsync('index.html')
    ctx.type = 'html'
    ctx.body = fileContent
  }
});

app.listen(3000)
console.log('listen at port 3000')
