const express = require('express');
const router = express.Router();
const getAllPlayers = require('../roster');

router.get('/', async function(req, res, next) {
  try {
      const result = await getAllPlayers();
      res.send(result);
  } catch (err) {
      console.error(err);
  }
});

module.exports = router;