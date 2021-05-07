const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3005, () => {
  console.log('server is running on http://localhost:3005')
})
