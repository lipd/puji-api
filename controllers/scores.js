class ScoresController {
  find(ctx) {
    ctx.body = 'score list'
  }

  findById(ctx) {
    ctx.body = `score id is ${ctx.params.id}`
  }

  create(ctx) {
    ctx.body = `score id is ${ctx.params.id}`
  }

  update(ctx) {
    ctx.body = `score id is ${ctx.params.id}`
  }

  delete(ctx) {
    ctx.status = 204
  }
}

module.exports = new ScoresController()
