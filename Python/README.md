This is based on Twilio IVR Tutorial of IVR with updates to Python 3.7 and [Flask](http://flask.pocoo.org/) web framework.

[Read the original tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/ivr-phone-tree/python/flask)!

Changes: fixed few library differnce between Python 2.7 and 3.7, e.g. has_key -> in
Add Redis DB for a customer DB with phone number and address to be read back the address to the caller.

See https://redis.io/topics/quickstart for installing Redis DB

Start the Redis Server
 $redis-server
Use redis-cli to put or get DB entries
$redis-cli

Updated from original tutorial instructions:

## Local Development

This project is built using [Flask](http://flask.pocoo.org/) web framework.

1. First clone this repository and `cd` into it.

   ```bash
   $ git clone https://github.com/chiral77/Python/Twilio-IVR.git
   $ cd Twilio-IVR
   ```

1. Create a new virtual environment.

    - If using vanilla [virtualenv](https://virtualenv.pypa.io/en/latest/):

        ```bash
        virtualenv venv
        source venv/bin/activate
        ```

1. Install the dependencies.

    ```bash
    pip install -r requirements.txt
    ```

1. Make sure the tests succeed.

    ```bash
    $ coverage run manage.py test
    ```

1. Start the server.

    ```bash
    python manage.py runserver
    ```

1. Expose the application to the wider Internet using [ngrok](https://ngrok.com/).

    ```bash
    ngrok http 5000 -host-header="localhost:5000"
    ```

1. Configure Twilio to call your webhooks

  You will also need to configure Twilio to call your application when calls are
  received in your [*Twilio Number*](https://www.twilio.com/user/account/messaging/phone-numbers).
  The voice url should look something like this:

  ```
  http://<your-ngrok-subdomain>.ngrok.io/ivr/welcome
  ```

  ![Configure Voice](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)


## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
