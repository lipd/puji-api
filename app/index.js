const Koa = require('koa')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const cors = require('@koa/cors')
const mongoose = require('mongoose')
let OSS = require('ali-oss')
const routing = require('./routes')
const path = require('path')
const fs = require('fs')
const https = require('https')

const {
  connectionUrl,
  port,
  cloudRegion,
  cloudId,
  cloudSecret,
} = require('./config')

mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log('MongoDB has connected')
  },
)
mongoose.connection.on('err', console.error)

const app = new Koa()

let client = new OSS({
  region: cloudRegion,
  accessKeyId: cloudId,
  accessKeySecret: cloudSecret,
})
client.useBucket('puji-api')

app.use(async (ctx, next) => {
  ctx.oss = client
  await next()
})

app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
  }),
)

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true,
    },
  }),
)
app.use(parameter(app))
app.use(
  cors({
    maxAge: 86400,
  }),
)

routing(app)

if (process.env.NODE_ENV === 'production') {
  const keyPath = path.resolve(__dirname, '../private.key')
  const certPath = path.resolve(__dirname, '../cert.pem')
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  }
  https.createServer(options, app.callback()).listen(443, () => {
    console.log('https server is running')
  })
} else {
  app.listen(port, () => {
    console.log('server is running on http://localhost:3005')
  })
}
