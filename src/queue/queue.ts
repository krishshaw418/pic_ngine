import { Queue } from "bullmq";
import { getRedisClient } from "../utils/redis";

export const requestQueue = new Queue("requestQueue", {
    connection: getRedisClient()
})