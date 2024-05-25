import { Module } from '@nestjs/common';
import { ObjectStoreService } from './object.store.service';

@Module({
  providers: [ObjectStoreService],
  exports: [ObjectStoreService]
})
export class ObjectStoreModule {

}
