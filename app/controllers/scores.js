const Score = require('../models/scores')
const User = require('../models/users')

const sorter = [
  undefined,
  { createdAt: 1 },
  { createdAt: -1 },
  { likes: -1 },
  { favorites: -1 },
]

class ScoresController {
  async find(ctx) {
    const match = {}
    const query = ctx.query
    const page = ctx.query.page && 1
    const order = ctx.query.order
    const q = ctx.query.q

    Object.keys(ctx.query)
      .filter((each) => each !== 'page' && each !== 'order' && each !== 'q')
      .forEach((key) => {
        match[key] = { $all: query[key].split(',') }
      })

    if (q) {
      match['$or'] = [{ name: new RegExp(q) }, { author: new RegExp(q) }]
    }

    const scores = await Score.find(match)
      .limit(9)
      .skip(page * 9)
      .sort(sorter[order])

    const total = await Score.countDocuments(match)

    ctx.body = {
      content: scores,
      total,
    }
  }

  async findById(ctx) {
    const score = await Score.findById(ctx.params.id).populate('uploader')
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
    const score = await new Score({
      ...ctx.request.body,
      uploader: ctx.state.user._id,
    }).save()
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
