const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const app = express();
const getAllPlayerStatus = require('../player');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/', async (req, res) => {
  try {
    const dat = req.body.followed;
    const result = await getAllPlayerStatus(dat);
    res.send(result);
    res.end();
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
