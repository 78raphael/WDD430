var express = require('express');
const Music = require('../models/music');
var router = express.Router();

// GET
router.get('/', (req, res, next) => {
  Music.find()
  .then(music => {
    console.log('Inside GET music');
    console.log('Music DB: ', music);
    res.status(200).json(music);
  })
  .catch(error => {
    res.status(500).json({
      message: 'An error occured in GET',
      error: error
    });
  });
});

module.exports = router;