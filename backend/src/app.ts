import express, {Request, Response} from 'express';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import noCache from 'nocache';
import {config} from './config';
import prom from 'prom-client';
import prisma from './v1/prisma/prisma-client';
import {logger} from './logger';
import {rateLimit} from 'express-rate-limit';
import promBundle from 'express-prom-bundle';
import {utils} from "./v1/services/util-service";
import helloRouter from './v1/routes/hello-route';
const register = new prom.Registry();
prom.collectDefaultMetrics({register});
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: '/prom-metrics',
  promRegistry: register,
});
const app = express();
const apiRouter = express.Router();

const logStream = {
  write: (message: string) => {
    logger.info(message);
  },
};

app.use(helmet());
app.use(noCache());

//tells the app to use json as means of transporting data
app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  }),
);

if ('production' === config.get('environment')) {
  app.set('trust proxy', 1);
}

app.use(
  morgan(
    ':method | :url | :status |  :response-time ms | :req[x-correlation-id] | :res[content-length]',
    {
      stream: logStream,
      skip: (req) => {
        return (
          req.baseUrl === '' || req.baseUrl === '/' || req.baseUrl === '/health'
        );
      },
    },
  ),
);

if (config.get('server:rateLimit:enabled')) {
  const limiter = rateLimit({
    windowMs: config.get('server:rateLimit:windowMs'),
    limit: config.get('server:rateLimit:limit'),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    skipSuccessfulRequests: true, // Do not count successful responses
  });
  app.use(limiter);
}
app.use(metricsMiddleware);
app.get(
  '/metrics',
  utils.asyncHandler(async (_req: Request, res: Response) => {
    const prismaMetrics = await prisma.$metrics.prometheus();
    const appMetrics = await register.metrics();
    res.end(prismaMetrics + appMetrics);
  }),
);
app.get(
  '/health',
  utils.asyncHandler(async (_req: Request, res: Response) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).send('Health check passed');
    } catch (e) {
      logger.error(`Health check failed: ${e}`);
      res.status(500).send('Health check failed');
    }
  }),
);

app.use(/(\/api)?/, apiRouter);
apiRouter.get('/', (_req, res) => {
  res.sendStatus(200); // generally for route verification and health check.
});
apiRouter.use('/hello', helloRouter);
export {app};
