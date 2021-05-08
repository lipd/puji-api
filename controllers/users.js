class UsersController {
  find(ctx) {
    ctx.body = 'user list'
  }

  findById(ctx) {
    ctx.body = `user id is ${ctx.params.id}`
  }

  create(ctx) {
    ctx.body = `user id is ${ctx.params.id}`
  }

  update(ctx) {
    ctx.body = `user id is ${ctx.params.id}`
  }

  delete(ctx) {
    ctx.status = 204
  }
}

module.exports = new UsersController()
