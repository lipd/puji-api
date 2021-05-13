const { Schema, model } = require('mongoose')

const scoreSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  xmlUrl: { type: String, required: true },
  cover: { type: String, required: true },
  author: { type: String, required: true },
  instruments: { type: [{ type: String }], required: false },
  genres: { type: [{ type: String }], required: false },
  lisences: {
    type: [{ type: String, enum: ['可商用', '可修改', '可分享', '个人使用'] }],
  },
  headline: { type: String },
  favorites: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
})

module.exports = model('Score', scoreSchema)
