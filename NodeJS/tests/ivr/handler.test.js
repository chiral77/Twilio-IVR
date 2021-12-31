const {welcome, menu, pickup} = require('../../src/ivr/handler');

describe('IvrHandler#Welcome', () => {
  it('should serve TwiML with gather', () => {
    const twiml = welcome();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action="/ivr/menu"');
    expect(twiml).toContain('numDigits="1"');
    expect(twiml).toContain('input="dtmf speech"');
    expect(twiml).toContain('hints="coupon order pickup"');
    expect(twiml).toContain('loop="3"');

    // TwiML content
    expect(twiml).toContain('Thanks for calling Ana Pizza.');
  });
});

describe('IvrHandler#Menu', () => {
  it(' To welcomes w/ input not 1, 2, 3, coupon, order,or pickup', () => {
    const twiml = menu();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML content
    expect(twiml).toContain('welcome');
  });

  it('should serve TwiML with say twice and hangup', () => {
    const twiml = menu('1');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Hangup')).toBe(1);

    // TwiML content
    expect(twiml).toContain(
        'Text will be sent with latest Ana Pizaa Offer'
    );
  });

  it('should serve TwiML with say twice and hangup', () => {
    const twiml = menu('Coupon.');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Hangup')).toBe(1);

    // TwiML content
    expect(twiml).toContain(
        'Text will be sent with latest Ana Pizaa Offer'
    );
  });

  it('should serve TwiML with say twice and hangup', () => {
    const twiml = menu('2');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);

    // TwiML content
    expect(twiml).toContain(
        'We are located at 815 W Van Buren St Chicago close to' +
        'University of Illinois at Chicago' +
        'Please text your order or stay on the line'
    );

    expect(twiml).toContain('Dial');
    expect(twiml).toContain('+12027331234');
  });

  it('should serve TwiML with say twice and hangup', () => {
    const twiml = menu('Orders.');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);

    // TwiML content
    expect(twiml).toContain(
        'We are located at 815 W Van Buren St Chicago close to' +
        'University of Illinois at Chicago' +
        'Please text your order or stay on the line'
    );

    expect(twiml).toContain('Dial');
    expect(twiml).toContain('+12027331234');
  });

  it('should serve TwiML with gather and say', () => {
    const twiml = menu('3');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action="/ivr/pickup"');
    expect(twiml).toContain('numDigits="1"');

    // TwiML content
    expect(twiml).toContain(
        'For pick of online orders, press 1 or say online. ' +
        'For pick of phone orders, press 2 or say phone'
    );
  });

  it('should serve TwiML with gather and say', () => {
    const twiml = menu('Pickup.');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action="/ivr/pickup"');
    expect(twiml).toContain('input="dtmf speech"');

    // TwiML content
    expect(twiml).toContain(
        'For pick of online orders, press 1 or say online. ' +
        'For pick of phone orders, press 2 or say phone'
    );
  });
});

describe('IvrHandler#pickup', () => {
  it('Redirect to pickup orders', () => {
    const twiml = pickup();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Redirect')).toBe(2);

    // TwiML content
    expect(twiml).toContain('welcome');
  });

  it('should serve TwiML with dial', () => {
    const twiml = pickup('1');

    // TwiML verbs
    expect(twiml).toContain('Dial');

    // TwiML content
    expect(twiml).toContain('+12027331234');
  });

  it('should serve TwiML with dial', () => {
    const twiml = pickup('Online.');

    // TwiML verbs
    expect(twiml).toContain('Dial');

    // TwiML content
    expect(twiml).toContain('+12027331234');
  });

  it('should serve TwiML with dial', () => {
    const twiml = pickup('2');

    // TwiML verbs
    expect(twiml).toContain('Dial');

    // TwiML content
    expect(twiml).toContain('+12027336637');
  });

  it('should serve TwiML with dial', () => {
    const twiml = pickup('Phone.');

    // TwiML verbs
    expect(twiml).toContain('Dial');

    // TwiML content
    expect(twiml).toContain('+12027336637');
  });
});

/**
 * Counts how many times a word is repeated
 * @param {String} paragraph
 * @return {String[]}
 */
function countWord(paragraph) {
  return (word) => {
    const regex = new RegExp(`\<${word}[ | \/?\>]|\<\/${word}?\>`);
    return (paragraph.split(regex).length - 1);
  };
}
