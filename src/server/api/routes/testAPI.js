var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const dat = {"game1": {"player1": "4:44", "player2": "1:11"}, "game2": {"player1": "2:44", "player2": "3:11"}}
    res.send(dat);
});

module.exports = router;