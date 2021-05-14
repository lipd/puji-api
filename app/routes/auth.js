const Router = require('koa-router')
const controller = require('../controllers/auth')
const userController = require('../controllers/users')

const router = new Router()

router.post('/login', controller.login)
router.post('/register', userController.create, controller.register)

module.exports = router
