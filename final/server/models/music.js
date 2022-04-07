const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
  id: { type: String, require: true },
  title: { type: String },
  album: { type: String },
  artist: { type: String },
  lyricsId: { type: String }
});

module.exports = mongoose.model('Music', musicSchema);