const Router = require('koa-router')
const controller = require('../controllers/upload')
const { auth } = require('../middleware/auth')

const router = new Router({ prefix: '/upload' })

router.post('/avatar', auth, controller.avatar)

router.post('/score', controller.score)

router.post('/cover', controller.cover)

module.exports = router
