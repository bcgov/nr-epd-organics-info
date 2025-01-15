import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { HttpModule } from '@nestjs/axios';
import { AmsOracleConnectorModule } from '../ams-oracle-connector/ams.oracle.connector.module';

@Module({
  imports: [HttpModule, AmsOracleConnectorModule],
  providers: [TasksService],
})
export class TasksModule {}
