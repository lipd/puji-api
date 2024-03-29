const Router = require('koa-router')
const controller = require('../controllers/scores')
const { auth, getUserId } = require('../middleware/auth')

const router = new Router({ prefix: '/scores' })

router.get('/', controller.find)

router.get('/mine', auth, controller.findMine)

router.get('/:id', getUserId, controller.findById)

router.post('/', auth, controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
