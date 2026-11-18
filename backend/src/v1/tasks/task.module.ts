import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { AmsOracleConnectorModule } from '../ams-oracle-connector/ams.oracle.connector.module';

@Module({
  imports: [AmsOracleConnectorModule],
  providers: [TasksService],
})
export class TasksModule {}
