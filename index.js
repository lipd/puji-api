const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const routing = require('./routes')

const app = new Koa()
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, rest },
  }),
)
app.use(bodyParser())

routing(app)

app.listen(3005, () => {
  console.log('server is running on http://localhost:3005')
})
