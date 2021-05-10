const jwt = require('koa-jwt')
const Router = require('koa-router')
const controller = require('../controllers/users')
const { secret } = require('../config')

const router = new Router({ prefix: '/users' })

const auth = jwt({ secret })

const checkOwner = async (ctx, next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, '没有权限')
  }
  await next()
}

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.post('/', controller.create)

router.patch('/:id', auth, checkOwner, controller.update)

router.delete('/:id', auth, checkOwner, controller.delete)

module.exports = router
