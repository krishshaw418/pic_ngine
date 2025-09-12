import { Redis } from "ioredis";

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
    if(!redisClient) {
        const redisURL = process.env.REDIS_CONNECTION_STRING as string;
        if(!redisURL) {
            throw new Error("REDIS_CONNECTION_STRING not set in environment variables")
        }

        redisClient = new Redis(redisURL, {
            maxRetriesPerRequest: null,
        });

        redisClient.on("connect", () => {
            console.log("Connected to Redis!");
        });

        redisClient.on("error", (err) => {
            console.error("❌ Redis connection error:", err);
        });
    }
    return redisClient;
}