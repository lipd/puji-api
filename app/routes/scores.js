const Router = require('koa-router')
const controller = require('../controllers/scores')

const router = new Router({ prefix: '/scores' })

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.post('/:id', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
