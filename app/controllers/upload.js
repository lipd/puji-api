const fs = require('fs')
const path = require('path')
const util = require('util')
const User = require('../models/users')

const unlink = util.promisify(fs.unlink)

class UploadContorller {
  async avatar(ctx) {
    const user = await User.findById(ctx.state.user._id)
    if (!user) ctx.throw(404, '用户不存在')

    const file = ctx.request.files.file
    if (!file) {
      ctx.throw(400, '文件上传方式错误')
    }

    const basename = path.basename(file.path).slice(7)
    try {
      const result = await ctx.oss.put(`avatars/${basename}`, file.path)
      const { url } = result
      await user.update({ avatar: url })
      await unlink(file.path)
      ctx.body = result
    } catch (err) {
      ctx.throw(500, '无法连接到 OSS 服务')
      await unlink(file.path)
    }
  }

  async score(ctx) {
    const file = ctx.request.files.file
    if (!file) {
      ctx.throw(400, '文件上传方式错误')
    }
    const basename = path.basename(file.path).slice(7)
    try {
      const result = await ctx.oss.put(`scores/${basename}`, file.path)
      await unlink(file.path)
      ctx.body = result
    } catch (err) {
      await unlink(file.path)
      ctx.throw(500, '无法连接到 OSS 服务')
    }
  }

  async cover(ctx) {
    const file = ctx.request.files.file
    if (!file) {
      ctx.throw(400, '文件上传方式错误')
    }
    const basename = path.basename(file.path).slice(7)
    try {
      const result = await ctx.oss.put(`scores/${basename}`, file.path)
      await unlink(file.path)
      ctx.body = result
    } catch (err) {
      await unlink(file.path)
      ctx.throw(500, '无法连接到 OSS 服务')
    }
  }
}

async function listBuckets() {
  try {
    let result = await client.listBuckets()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

module.exports = new UploadContorller()
