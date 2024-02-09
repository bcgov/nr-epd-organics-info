import dotenv from 'dotenv';
import config from 'nconf';

dotenv.config();
const env = process.env.NODE_ENV || 'local';

config.defaults({
  environment: env,
  server: {
    frontend: process.env.SERVER_FRONTEND,
    logLevel: process.env.LOG_LEVEL,
    morganFormat: 'dev',
    port: process.env.PORT || 3000,
    rateLimit: {
      enabled: process.env.IS_RATE_LIMIT_ENABLED || false, // Disable if rate limiting is not required
      windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60000, // 1 minute
      limit: process.env.RATE_LIMIT_LIMIT || 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    },
  },
});
export { config };
