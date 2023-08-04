var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('movie get');
  res.send('movie get');
});

module.exports = router;
