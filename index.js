const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routing = require('./routes')

const app = new Koa()
app.use(bodyParser())

routing(app)

app.listen(3005, () => {
  console.log('server is running on http://localhost:3005')
})
