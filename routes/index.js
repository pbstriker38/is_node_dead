var express = require('express');
var router = express.Router();

const Answer = require('../services/answer');

/* GET home page. */
router.get('/', async function(req, res, next) {
  answer = new Answer()
  await answer.randomize()

  res.render(
    'index',
    {
      answer: answer
    }
  );
});

module.exports = router;
