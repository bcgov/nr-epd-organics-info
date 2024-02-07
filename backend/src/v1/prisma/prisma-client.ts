import {logger} from "../../logger";

let prisma: PrismaClient;
import {PrismaClient} from '@prisma/client';

const DB_HOST = process.env.POSTGRES_HOST || 'localhost';
const DB_USER = process.env.POSTGRES_USER || 'postgres';
const DB_PWD = encodeURIComponent(process.env.POSTGRES_PASSWORD || 'default');
const DB_PORT = process.env.POSTGRES_PORT || 5432;
const DB_NAME = process.env.POSTGRES_DATABASE || 'postgres';
const DB_SCHEMA = process.env.DB_SCHEMA || 'omrr';
if (!prisma) {
  const datasourceUrl = `postgresql://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}&connection_limit=5`;
  logger.silly(`Connecting to ${datasourceUrl}`);
  prisma = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'info' },
      { emit: 'stdout', level: 'warn' },
      { emit: 'stdout', level: 'error' }
    ],
    errorFormat: 'pretty',
    datasourceUrl: datasourceUrl,
  });
  // @ts-expect-error prisma thing.
  prisma.$on('query', (e) => {
    // @ts-expect-error prisma thing.
    logger.debug(`Query: ${e.query}- Params: ${e.params} - Duration: ${e.duration}ms`);
  });
}

export default prisma;
