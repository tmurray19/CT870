var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('comments', { title: 'Comment on the Cool Club' });
});

module.exports = router;
