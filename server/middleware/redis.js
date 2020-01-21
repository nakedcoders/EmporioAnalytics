// redis-client.js
const redis = require('redis');
const Redis = redis.createClient(process.env.REDIS_URL);

module.exports = Redis