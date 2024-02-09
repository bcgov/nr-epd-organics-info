import http from 'http';
import {config} from './config/index';

import {logger} from './logger';

import {app} from './app';
import prisma from './v1/prisma/prisma-client';

// run inside `async` function

const port = config.get('server:port');
const server = http.createServer(app);
prisma.$connect().then(() => {
  app.set('port', port);
  logger.info('Postgres initialized');
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}).catch((error: any) => {
  logger.error(error);
  process.exit(1);
});


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: { syscall: string; code: string; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  logger.info('Listening on ' + bind);
}

process.on('SIGINT', () => {
  prisma.$disconnect()
    .then(() => {
      server.close();
      logger.info('process terminated by SIGINT');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Error while disconnecting from Prisma:', error);
      process.exit(1); // Handle the error and exit with a non-zero status code
    });
});
process.on('SIGTERM', () => {
  prisma.$disconnect()
    .then(() => {
      server.close();
      logger.info('process terminated by SIGTERM');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Error while disconnecting from Prisma:', error);
      process.exit(1); // Handle the error and exit with a non-zero status code
    });
});
// Prevent unhandled promise errors from crashing application
process.on('unhandledRejection', (err: Error) => {
  if (err?.stack) {
    logger.error(err);
  }
});
