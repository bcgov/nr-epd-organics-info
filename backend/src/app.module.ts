import 'dotenv/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HTTPLoggerMiddleware } from './middleware/req.res.logger';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MetricsController } from './metrics.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { TasksModule } from './v1/tasks/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AmsOracleConnectorModule } from './v1/ams-oracle-connector/ams.oracle.connector.module';
import { AmsOracleConnectorService } from './v1/ams-oracle-connector/ams.oracle.connector.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TerminusModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000,
      },
    ]),
    ScheduleModule.forRoot(),
    TasksModule,
    AmsOracleConnectorModule,
  ],
  controllers: [AppController, MetricsController, HealthController],
  providers: [AppService, AmsOracleConnectorService],
})
export class AppModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HTTPLoggerMiddleware)
      .exclude(
        { path: 'metrics', method: RequestMethod.ALL },
        {
          path: 'health',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*');
  }
}
