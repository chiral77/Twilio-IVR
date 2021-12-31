const VoiceResponse = require('twilio').twiml.VoiceResponse;


exports.welcome = function welcome(address) {
  const voiceResponse = new VoiceResponse();


  const gather = voiceResponse.gather({
    input: 'dtmf speech',
    hints: 'coupon order pickup',
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
      'Thanks for calling Ana Pizza. ' +
      'Are you calling from ' + address +
      'Please press 1 for coupon or say coupon' +
      'or press 2 for order or say order' +
      'or press 3 for pick or say pickup',
      {loop: 3}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(selectedOption) {
  const optionActions = {
    '1': couponMessage,
    'Coupon.': couponMessage,
    '2': orders,
    'Orders.': orders,
    '3': listPickup,
    'Pickup.': listPickup,
  };

  return (optionActions[selectedOption]) ?
     optionActions[selectedOption]():
     redirectWelcome();
};

/**
 * returns twiml
 * @return {String}
 */
function orders() {
  const twiml = new VoiceResponse();

  twiml.say('We are located at 815 W Van Buren St Chicago close to' +
  'University of Illinois at Chicago' +
  'Please text your order or stay on the line',
  {voice: 'alice', language: 'en-GB'}
  );

  twiml.dial('+12027331234');
  return twiml.toString();
};

exports.pickup = function pickup(selectedOption) {
  const optionActions = {
    '1': '+12027331234',
    'Online.': '+12027331234',
    '2': '+12027336637',
    'Phone.': '+12027336637',
  };

  if (optionActions[selectedOption]) {
    const twiml = new VoiceResponse();
    twiml.dial(optionActions[selectedOption]);
    return twiml.toString();
  }

  return redirectWelcome();
};

/**
 * Returns Twiml
 * @return {String}
 */
function couponMessage() {
  const twiml = new VoiceResponse();

  twiml.say(
      'Text will be sent with latest Ana Pizaa Offer',
      {voice: 'alice', language: 'en-GB'}
  );

  twiml.hangup();

  return twiml.toString();
}

/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function listPickup() {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: 'dtmf speech',
    hints: 'online phone',
    action: '/ivr/pickup',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
      'For pick of online orders, press 1 or say online. ' +
      'For pick of phone orders, press 2 or say phone',
      {voice: 'alice', language: 'en-GB', loop: 3}
  );

  return twiml.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
