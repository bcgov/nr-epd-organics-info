import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ObjectStoreService } from '../object-store/object.store.service'
import { logger } from '../../logger'

@Injectable()
export class TasksService {

  constructor(private readonly objectStoreService: ObjectStoreService) {

  }

  @Cron('0 0 0/4 * * *')
  async refreshCache() {
    logger.info('refresh cache every 4 hours')
    await this.objectStoreService.getLatestOmrrDataFromObjectStore()

  }

}
