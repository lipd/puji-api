const Router = require('koa-router')
const controller = require('../controllers/users')

const router = new Router({ prefix: '/users' })

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.post('/', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
