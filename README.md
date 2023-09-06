# Description

This is my back-end implementation for [Dicoding's notes app](http://notesapp-v3.dicodingacademy.com/) web app that is built with [Hapi.js](https://hapi.dev/) web framework for Node.js and [PostgreSQL](https://www.postgresql.org/) database. The app is also integrated with [RabbitMQ](https://www.rabbitmq.com/) for sending email notification and [Redis](https://redis.io/) for caching.

## Dependencies

- [Node.js](https://nodejs.org/en/) v18.17.1
- [NPM](https://www.npmjs.com/) v9.6.7
- [Hapi.js](https://hapi.dev/) v21.3.2
- [Hapi JWT](https://www.npmjs.com/package/@hapi/jwt) v3.2.0
- [Hapi Inert](https://www.npmjs.com/package/@hapi/inert) v6.0.3
- [Joi](https://www.npmjs.com/package/joi) v17.9.2
- [Pg](https://www.npmjs.com/package/pg) v8.11.1
- [Node-Pg-Migrate](https://www.npmjs.com/package/node-pg-migrate) v6.2.2
- [Redis](https://www.npmjs.com/package/redis) v4.6.8
- [Ampqlib](https://www.npmjs.com/package/amqplib) v0.10.3
- [AWS SDK](https://www.npmjs.com/package/aws-sdk) v2.1450.0
- [Bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.0
- [Nano ID](https://www.npmjs.com/package/nanoid) v3.3.6
- [Dotenv](https://www.npmjs.com/package/dotenv) v16.3.1
- [EsLint](https://eslint.org/) v8.33.0
- [Nodemon](https://nodemon.io/) v3.0.1

## How to run

1. Clone this repository
2. Open your terminal and go to the project directory
3. Run `npm install` to install all dependencies
4. Run `npm run start-dev` to start the server
5. Open your browser and go to `http://notesapp-v2.dicodingacademy.com/`
6. Click `Change URL` button and paste `http://localhost:5000` to the input field
7. Enjoy!

## Learning and Reference Sources

- [Belajar Membuat Aplikasi Back-End untuk Pemula](https://www.dicoding.com/academies/261) by [Dicoding](https://www.dicoding.com/)
- [Belajar Fundamental Aplikasi Back-End](https://www.dicoding.com/academies/271) by [Dicoding](https://www.dicoding.com/)
