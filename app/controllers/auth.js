const User = require('../models/users')

const jwt = require('jsonwebtoken')
const { secret } = require('../config')

class ScoresController {
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) ctx.throw(401, '用户名或密码不正确')
    const { _id, name, avatar } = user
    const token = jwt.sign({ _id }, secret, { expiresIn: '3d' })
    ctx.body = { token, _id, name, avatar }
  }

  async register(ctx) {
    const { _id, name, avatar } = ctx.body
    const token = jwt.sign({ _id }, secret, { expiresIn: '3d' })
    ctx.body = { _id, name, avatar, token }
  }

  async me(ctx) {
    const user = await User.findById(ctx.state.user._id)
    if (!user) ctx.throw(401, '令牌失效')
    ctx.body = user
  }
}

module.exports = new ScoresController()
