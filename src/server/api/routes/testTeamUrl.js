const express = require('express');

const router = express.Router();
const getTeamsUrl = require('../teamUrl');

router.get('/', async (req, res) => {
  try {
    const result = await getTeamsUrl();
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
