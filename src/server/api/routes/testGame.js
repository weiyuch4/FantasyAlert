const express = require('express');

const router = express.Router();
const getAllGameId = require('../game');

router.get('/', async (req, res) => {
  try {
    const result = await getAllGameId();
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
