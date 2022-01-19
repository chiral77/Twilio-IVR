const Router = require('express').Router;
const {welcome, menu, pickup} = require('./handler');
const redis = require('redis');
// const redisClient = redis.createClient({
//   host: 'redis-customer',
//   port: 6379
// }); // create Redis client

const redisClient = require('./redis-client');

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  caller = req.body.From;
  // const getaddress = redisClient.get(caller);
  let city = readAddress(caller);
  
  if (city) {
    res.send(welcome(city));
  } else {
    send(welcome('Near By'));
  };
});

async function readAddress (caller) {
  let city = await redisClient.getAsync(caller);
  return city;
}

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
