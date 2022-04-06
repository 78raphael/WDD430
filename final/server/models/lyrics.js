const mongoose = require('mongoose');

const lyricsSchema = mongoose.Schema({
  id: { type: String, require: true },
  lyrics: [{
    id: { type: String },
    paragraph: { type: String }
  }]
});

module.exports = mongoose.model('Lyrics', lyricsSchema);