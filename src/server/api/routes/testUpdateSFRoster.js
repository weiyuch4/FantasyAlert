const express = require('express');

const router = express.Router();
const updateSearchFullRoster = require('../updateSearchFullRoster');

router.get('/', async (req, res) => {
  try {
    const result = await updateSearchFullRoster();
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
