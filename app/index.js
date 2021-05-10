const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const routing = require('./routes')
const { connectionUrl, port } = require('./config')

mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log('MongoDB has connected')
  },
)
mongoose.connection.on('err', console.error)

const app = new Koa()
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, rest },
  }),
)
app.use(bodyParser())
app.use(parameter(app))

routing(app)

app.listen(port, () => {
  console.log('server is running on http://localhost:3005')
})
