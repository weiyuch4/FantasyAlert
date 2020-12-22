const express = require('express');

const router = express.Router();
const getAllPlayers = require('../roster');

router.get('/', async (req, res) => {
  try {
    const result = await getAllPlayers();
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
