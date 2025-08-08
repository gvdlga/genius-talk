import { createClient, RedisClientType } from 'redis';

const REDIS_URI = process.env.REDIS_URI;

if (!REDIS_URI) {
  throw new Error('Please define the REDIS_URI environment variable inside .env.local');
}

let redisClient: RedisClientType | null = null;

async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({ url: REDIS_URI });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
      redisClient = null; // Reset client on error
    });

    await redisClient.connect();
    console.log("Redis connected");
  }

  return redisClient;
}

export default getRedisClient;
