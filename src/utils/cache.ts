import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

class CacheService {
    private client: Redis;
    private isConnected: boolean = false;

    constructor() {
        this.client = new Redis(redisUrl, {
            retryStrategy(times) {
                if (times > 3) {
                    console.error('Redis connection failed permanently');
                    return null; // Stop retrying
                }
                return Math.min(times * 50, 2000);
            },
        });

        this.client.on('connect', () => {
            console.log('Redis client connected');
            this.isConnected = true;
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
            this.isConnected = false;
        });
    }

    async get(key: string): Promise<string | null> {
        if (!this.isConnected) return null;
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error('Redis GET error', error);
            return null;
        }
    }

    async set(key: string, value: string, expirationSeconds: number = 3600): Promise<void> {
        if (!this.isConnected) return;
        try {
            await this.client.set(key, value, 'EX', expirationSeconds);
        } catch (error) {
            console.error('Redis SET error', error);
        }
    }
}

export const cacheService = new CacheService();
