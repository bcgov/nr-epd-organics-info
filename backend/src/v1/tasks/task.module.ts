import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { ObjectStoreModule } from '../object-store/object.store.module'

@Module({
  imports: [ObjectStoreModule],
  providers: [TasksService],
})
export class TasksModule {}
