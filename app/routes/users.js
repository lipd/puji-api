const Router = require('koa-router')
const controller = require('../controllers/users')
const { auth, checkOwner } = require('../middleware/auth')

const router = new Router({ prefix: '/users' })

router.get('/', controller.find)

router.get('/:id', controller.findById)

// router.post('/', controller.create)

router.patch('/:id', auth, checkOwner, controller.update)

router.delete('/:id', auth, checkOwner, controller.delete)

module.exports = router
