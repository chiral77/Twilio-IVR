const Router = require('express').Router;
const {welcome, menu, pickup} = require('./handler');
const redis = require('redis');
const redisClient = redis.createClient({
  host: '127.0.0.1',
}); // create Redis client

(async() => {
  await redisClient.connect();
})();

redisClient.on('connect', () => {
  console.log('Redis Client Connected');
});
redisClient.on('error', (err) =>{
  console.log('Redis Client Connection Error', err);
});

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  caller = req.body.From;

  const getaddress = redisClient.get(caller);
  getaddress.then( (reply) => {
    if (reply) {
      res.send(welcome(reply));
    } else if (req.body.City) {
      res.send(welcome(re.body.City));
    } else {
      send(welcome('Near By'));
    }
  });
});

// POST: /ivr/menu
language: 'en-GB',
router.post('/menu', (req, res) => {
  if (req.body.Digits) {
    selectedOption = req.body.Digits;
  } else if (req.body.SpeechResult) {
    selectedOption = req.body.SpeechResult;
  }

  return res.send(menu(selectedOption));
});

// POST: /ivr/planets
router.post('/pickup', (req, res) => {
  if (req.body.Digits) {
    selectedOption = req.body.Digits;
  } else if (req.body.SpeechResult) {
    selectedOption = req.body.SpeechResult;
  }

  res.send(pickup(selectedOption));
});

module.exports = router;
