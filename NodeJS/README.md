
Create a seamless customer service experience by building an IVR Phone Tree for your company. IVR systems allow your customers to access the people and information they need.

See original turotial:
[Read the full tutorial here!](https://www.twilio.com/docs/tutorials/walkthrough/ivr-phone-tree/node/express)

## Local Development

This project is build using [Express](http://expressjs.com/) web framework and
depends on [MongoDB](https://www.mongodb.com).

Addition to the tutorial:

Add Redis DB for a customer DB with phone number and address to be read back the address to the caller.

See https://redis.io/topics/quickstart for installing Redis DB

Start the Redis Server $redis-server Use redis-cli to put or get DB entries $redis-cli

Pay special attention to asynch of redis client access. 

1. First clone this repository and `cd` into it.

   ```bash
   git clone https://github.com/chiral77/Twilio-IVR.git
   cd Twilio-IVR/NodeJS
   ```
1. Install project's dependencies.

   ```bash
   npm install
   ```

1. Make sure the tests succeed.

   ```bash
   npm test
   ```

1. Start the development server.

   ```bash
   npm start
   ```

   Alternatively you might also consider using [nodemon](https://github.com/remy/nodemon) for this. It works just like
   the node command, but automatically restarts your application when you change any source code files.

   ```bash
   npm install -g nodemon \
   nodemon .
   ```

1. Check it out at [http://localhost:3000](http://localhost:3000).

1. Expose the application to the wider Internet using [ngrok](https://ngrok.com/).

   ```bash
   ngrok http 3000
   ```

1. Provision a number under the [Twilio's Manage Numbers](https://www.twilio.com/console/phone-numbers/incoming)
   page on your account. Set the voice URL for the number to http://[your-ngrok-subdomain].ngrok.io/ivr/welcome


Part 2: Containerized the project

- At the time of this build, express 4.x.x was not ready, the express version was downgraded to 3.1.6
- Add Dockerfile and Docker-compose.yml
- Add .gitter.env to replace .env
- use "docker-compose up --build" to start the service
## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
