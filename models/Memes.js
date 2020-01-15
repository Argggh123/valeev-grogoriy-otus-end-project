const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  urlType: {
    type: String,
  },
  memesImage: {
    type: String,
    required: true,
  },
  memesName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
  },
  tags: {
    type: String,
  },
  owner: {
    type: Types.ObjectId, ref: 'User',
  },
});

module.exports = model('Memes', schema);
