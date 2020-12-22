const express = require('express');

const router = express.Router();
const getResults = require('../scraper');

router.get('/', async (req, res, next) => {
  try {
    const result = await getResults();
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
