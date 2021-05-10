const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  password: { type: String, required: true, select: false },
})

module.exports = model('User', userSchema)
