
export const redisConnect = {
    host: process.env.REDIS_LOCAL_HOST,
    port: process.env.REDIS_LOCAL_PORT,
    // password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
};
