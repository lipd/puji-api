const Router = require('koa-router')
const controller = require('../controllers/users')
const { auth, checkOwner } = require('../middleware/auth')

const router = new Router({ prefix: '/users' })

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.get('/:id/favorites', auth, controller.findFavorites)

// router.post('/', controller.create)

router.patch('/:id', auth, checkOwner, controller.update)

router.delete('/:id', auth, checkOwner, controller.delete)

router.put('/favorite/:id', auth, controller.favorite)

router.delete('/favorite/:id', auth, controller.unfavorite)

router.put('/liking/:id', auth, controller.like)

router.delete('/liking/:id', auth, controller.unlike)

module.exports = router
