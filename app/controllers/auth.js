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
    const { _id, name } = user
    const token = jwt.sign({ _id, name }, secret, { expiresIn: '3d' })
    ctx.body = { token }
  }
}

module.exports = new ScoresController()
