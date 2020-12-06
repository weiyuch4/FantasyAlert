const express = require('express');
const router = express.Router();
const getAllPlayerStatus = require('../player');

router.get('/', async function(req, res, next) {
  try {
      const result = await getAllPlayerStatus(["Rajon Rondo", "LeBron James", "Dwight Howard"]);
      res.send(result);
  } catch (err) {
      console.error(err);
  }
});

module.exports = router;