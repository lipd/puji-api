const Router = require('koa-router')
const router = new Router({ prefix: '/users' })

router.get('/', (ctx) => {
  ctx.body = 'user list'
})

router.get('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`
})

router.post('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`
})

router.put('/:id', (ctx) => {
  ctx.body = `user id is ${ctx.params.id}`
})

router.delete('/:id', (ctx) => {
  ctx.status = 204
})

module.exports = router
