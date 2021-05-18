const Score = require('../models/scores')

class ScoresController {
  async find(ctx) {
    const match = {}
    const query = ctx.query
    Object.keys(ctx.query).forEach((key) => {
      match[key] = { $all: query[key].split(',') }
    })

    ctx.body = await Score.find(match)
  }

  async findById(ctx) {
    const score = await Score.findById(ctx.params.id)
    if (!score) {
      ctx.throw(404, '乐谱不存在')
    }
    ctx.body = score
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      xmlUrl: { type: 'string', required: true },
      cover: { type: 'string', required: false },
      author: { type: 'string', required: true },
      instruments: { type: 'array', itemType: 'string', required: false },
      genres: { type: 'array', itemType: 'string', required: false },
      licenses: { type: 'array', itemType: 'string', required: false },
      description: { type: 'string', required: false },
    })
    const score = await new Score(ctx.request.body).save()
    ctx.body = score
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      xmlUrl: { type: 'string', required: false },
      cover: { type: 'string', required: false },
      author: { type: 'string', required: false },
      instruments: { type: 'array', itemType: 'string', required: false },
      genres: { type: 'array', itemType: 'string', required: false },
      licenses: { type: 'array', itemType: 'string', required: false },
      description: { type: 'string', required: false },
    })
    const score = await Score.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!score) ctx.throw(404, '乐谱不存在')
    ctx.body = score
  }

  async delete(ctx) {
    const score = await Score.findByIdAndRemove(ctx.params.id)
    if (!score) ctx.throw(404, '乐谱不存在')
    ctx.status = 204
  }
}

module.exports = new ScoresController()
