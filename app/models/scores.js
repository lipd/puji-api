const { Schema, model } = require('mongoose')

const scoreSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    xmlUrl: { type: String, required: true },
    cover: { type: String, required: false },
    author: { type: String, required: true },
    instruments: { type: [{ type: String }], required: false },
    genres: { type: [{ type: String }], required: false },
    licenses: {
      type: [
        {
          type: String,
          enum: ['to-change', 'to-commertial', 'to-share', 'to-personal'],
        },
      ],
    },
    description: { type: String },
    favorites: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
)

module.exports = model('Score', scoreSchema)
