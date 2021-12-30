# 09/05/2021 fixed python3 has_key -> in

from flask import (
    flash,
    render_template,
    redirect,
    request,
    session,
    url_for,
)
from twilio.twiml.voice_response import VoiceResponse

from ivr_phone_tree_python import app
from ivr_phone_tree_python.view_helpers import twiml
from ivr_phone_tree_python import customerdb 

@app.route('/')
@app.route('/ivr')
def home():
    return render_template('index.html')


@app.route('/ivr/welcome', methods=['POST'])
def welcome():

    caller = request.values.get('From')
    #address = "Reston, Virginia"

    # Read customer DB from redis DB with keyed off caller ID
    address = str(customerdb.get(caller), 'UTF-8')

    response = VoiceResponse()
    with response.gather( input='dtmf speech', hints="coupon, order, pickup",
        num_digits=1, action=url_for('menu'), method="POST"
    ) as g:
        g.say(message="Thanks for calling Ena Pizza. " +
              "Are you calling from" + address +
              "Please press 1 for Coupon or say Coupon" +
              "Press 2 for order or say order" +
              "Press 3 for pickup or say pickup", loop=3)
    return twiml(response)


@app.route('/ivr/menu', methods=['POST'])
def menu():

    if('Digits' in request.form):
        selected_option = request.form['Digits']
    
    elif('SpeechResult' in request.form):
        selected_option = request.form['SpeechResult']
    else:
        return _redirect_welcome()
     
    option_actions = {'1': _coupon_msg,
                      '2': _order,
                      '3': _list_pickup,
                      'Coupon.': _coupon_msg,
                      'Order.': _order,
                      'Pickup.': _list_pickup}
  

    if (selected_option in option_actions):
        response = VoiceResponse()
        option_actions[selected_option](response)
        return twiml(response)

    return _redirect_welcome()


@app.route('/ivr/pickup', methods=['POST'])
def pickup():
    if('Digits' in request.form):
        selected_option = request.form['Digits']
    
    elif('SpeechResult' in request.form):
        selected_option = request.form['SpeechResult']
    else:
        return _redirect_welcome()
     
    option_actions = {'1': "+12024173378",
                      '2': "+12027336386",
                      'Online.': "+12024173378",
                      'Phone.': "+12027336386"}

    if selected_option in option_actions:
        response = VoiceResponse()
        response.dial(option_actions[selected_option])
        return twiml(response)

    return _redirect_welcome()


# private methods

def _coupon_msg(response):
    response.say("Text will be sent with the latest Ena Pizza Offer")
    response.hangup()
    return response

def _order(response):

    response.say("We are located at 815 W Van Buren St Chicago close to" +
                 "University of Illinois at Chicago" +
                 "Please text your order or stay on the line", 
                 voice="alice", language="en-GB")
    response.dial('+18472713211')
    return twiml(response)


def _list_pickup(response):
    with response.gather( input='dtmf speech', hints="online, phone",
        num_digits=1, action=url_for('pickup'), method="POST"
    ) as g:
        g.say(message="Please press 1 for online order or say online" +
              "Press 2 for phone order or say phone", 
              voice="alice", language="en-GB", loop=3)

    return response


def _redirect_welcome():
    response = VoiceResponse()
    response.say("Returning to the main menu", voice="alice", language="en-GB")
    response.redirect(url_for('welcome'))

    return twiml(response)
