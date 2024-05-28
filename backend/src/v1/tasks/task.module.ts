import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { ObjectStoreModule } from '../object-store/object.store.module';
import { HttpModule } from '@nestjs/axios';
import { AmsOracleConnectorModule } from '../ams-oracle-connector/ams.oracle.connector.module';

@Module({
  imports: [ObjectStoreModule, HttpModule, AmsOracleConnectorModule],
  providers: [TasksService]
})
export class TasksModule {
}
