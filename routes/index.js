var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.ip', req.ip);
  console.log('req.ips', req.ips);

  res.render('index', { title: 'Express' });
});

module.exports = router;
