import { createClient } from "redis";
import "dotenv/config";
import process from "process";
// Create the client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));
redisClient.on("connect", () => console.log("⚡ Redis Connected Successfully"));

// Connect immediately
await redisClient.connect();

export default redisClient;
