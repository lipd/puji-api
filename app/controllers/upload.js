const fs = require('fs')
const path = require('path')
const util = require('util')

const unlink = util.promisify(fs.unlink)

class UploadContorller {
  async upload(ctx) {
    const file = ctx.request.files.file
    if (!file) {
      ctx.throw(400, '文件上传方式错误')
    }

    const basename = path.basename(file.path).slice(7)
    try {
      const result = await ctx.oss.put(`avatar/${basename}`, file.path)
      await unlink(file.path)
      ctx.body = { path: file.path, result }
    } catch (err) {
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
