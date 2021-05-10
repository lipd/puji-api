const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
})

module.exports = model('User', userSchema)
