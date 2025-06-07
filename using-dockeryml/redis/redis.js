const { REDIS_PORT, REDIS_URL } = require("../config/config.js");

const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");

let redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});

module.exports = {
  RedisStore,
  redisClient,
};
