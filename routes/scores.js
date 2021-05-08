const Router = require('koa-router')
const router = new Router({ prefix: '/scores' })

router.get('/', (ctx) => {
  ctx.body = 'score list'
})

router.get('/:id', (ctx) => {
  ctx.body = `score id is ${ctx.params.id}`
})

router.post('/:id', (ctx) => {
  ctx.body = `score id is ${ctx.params.id}`
})

router.put('/:id', (ctx) => {
  ctx.body = `score id is ${ctx.params.id}`
})

router.delete('/:id', (ctx) => {
  ctx.status = 204
})

module.exports = router
