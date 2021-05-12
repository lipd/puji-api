const Router = require('koa-router')
const controller = require('../controllers/upload')

const router = new Router({ prefix: '/upload' })

router.post('/', controller.upload)

module.exports = router
