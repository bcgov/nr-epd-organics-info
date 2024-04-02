import 'dotenv/config'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { HTTPLoggerMiddleware } from './middleware/req.res.logger'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { MetricsController } from './metrics.controller'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { ThrottlerModule } from '@nestjs/throttler'
import { ObjectStoreModule } from './v1/object-store/object.store.module'
import { ObjectStoreService } from './v1/object-store/object.store.service'
import { TasksModule } from './v1/tasks/task.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TerminusModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 1000,
    }]),
    ScheduleModule.forRoot(),
    TasksModule,
    ObjectStoreModule,
  ],
  controllers: [AppController, MetricsController, HealthController],
  providers: [AppService, ObjectStoreService],
})
export class AppModule { // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerMiddleware).exclude({ path: 'metrics', method: RequestMethod.ALL }, {
      path: 'health',
      method: RequestMethod.ALL,
    }).forRoutes('*')
  }
}
