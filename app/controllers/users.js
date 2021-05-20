const User = require('../models/users')
const Score = require('../models/scores')

const sorter = [
  undefined,
  { createdAt: 1 },
  { createdAt: -1 },
  { likes: -1 },
  { favorites: -1 },
]

class UsersController {
  async find(ctx) {
    ctx.body = await User.find()
  }

  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  async findFavorites(ctx) {
    const match = {}
    const query = ctx.query
    const page = ctx.query.page && 1
    const order = ctx.query.order

    Object.keys(ctx.query)
      .filter((each) => each !== 'page' && each !== 'order' && each !== 'q')
      .forEach((key) => {
        match[key] = { $all: query[key].split(',') }
      })

    const user = await User.findById(ctx.params.id)
      .select('+favorites')
      .populate({ path: 'favorites', match, options: { sort: sorter[order] } })
      .limit(9)
      .skip(page * 9)

    if (!user) {
      ctx.throw(404, '用户不存在')
    }

    ctx.body = {
      content: user.favorites,
      total: 1,
    }
  }

  async create(ctx, next) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
      avatar: { type: 'string', required: false },
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) ctx.throw(409, '用户已经存在')
    const user = await new User(ctx.request.body).save()
    ctx.state.user = user
    ctx.body = user
    await next()
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar: { type: 'string', required: false },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.status = 204
  }

  async favorite(ctx) {
    const user = await User.findById(ctx.state.user._id).select('+favorites')

    if (!user.favorites.map((id) => id.toString()).includes(ctx.params.id)) {
      const score = await Score.findByIdAndUpdate(ctx.params.id, {
        $inc: { favorites: 1 },
      })
      if (!score) {
        ctx.throw(404, '乐谱不存在')
      }

      user.favorites.push(ctx.params.id)
      user.save()
    }

    ctx.status = 204
  }

  async unfavorite(ctx) {
    const user = await User.findById(ctx.state.user._id).select('+favorites')

    const index = user.favorites
      .map((id) => id.toString())
      .indexOf(ctx.params.id)
    if (index > -1) {
      const score = await Score.findByIdAndUpdate(ctx.params.id, {
        $inc: { favorites: -1 },
      })
      if (!score) {
        ctx.throw(404, '乐谱不存在')
      }

      user.favorites.splice(index, 1)
      user.save()
    }

    ctx.status = 204
  }

  async like(ctx) {
    const user = await User.findById(ctx.state.user._id).select('+likings')

    if (!user.likings.map((id) => id.toString()).includes(ctx.params.id)) {
      const score = await Score.findByIdAndUpdate(ctx.params.id, {
        $inc: { likes: 1 },
      })
      if (!score) {
        ctx.throw(404, '乐谱不存在')
      }

      user.likings.push(ctx.params.id)
      user.save()
    }

    ctx.status = 204
  }

  async unlike(ctx) {
    const user = await User.findById(ctx.state.user._id).select('+likings')

    const index = user.likings.map((id) => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      const score = await Score.findByIdAndUpdate(ctx.params.id, {
        $inc: { likes: -1 },
      })

      if (!score) {
        ctx.throw(404, '乐谱不存在')
      }

      user.likings.splice(index, 1)
      user.save()
    }

    ctx.status = 204
  }
}

module.exports = new UsersController()
