const Router = require('koa-router')
const controller = require('../controllers/auth')
const userController = require('../controllers/users')
const { auth } = require('../middleware/auth')

const router = new Router()

router.post('/login', controller.login)
router.post('/register', userController.create, controller.register)
router.post('/me', auth, controller.me)

module.exports = router
