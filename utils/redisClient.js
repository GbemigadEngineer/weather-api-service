const redis = require("redis");

// Create Redis client for Memurai running locally

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_URL || "127.0.0.1",
    port: 6379,
  },
});

client.on("error", (err) => console.error("Redis Client Error:", err));

// Connect client/ turn on client

client.connect();

module.exports = client;
