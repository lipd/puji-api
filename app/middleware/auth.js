const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/users')

exports.auth = koaJwt({ secret })

exports.getUserId = async (ctx, next) => {
  const { authorization } = ctx.request.header
  if (authorization) {
    const token = authorization.replace(/^Bearer /, '')

    let id
    try {
      const { _id } = jwt.verify(token, secret)
      id = _id
    } catch (err) {
      ctx.throw(401, '无效的令牌')
    }

    ctx.state.id = id || ''
  }
  await next()
}

exports.checkOwner = async (ctx, next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, '没有权限')
  }
  await next()
}
