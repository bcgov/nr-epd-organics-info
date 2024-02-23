import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ObjectStoreService } from './v1/object-store/object.store.service'
import { OmrrData } from './v1/types/omrr-data'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly objectStoreService: ObjectStoreService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/omrr')
  async getAllOmrrRecords(): Promise<OmrrData[]> {
    return this.objectStoreService.getLatestOMRRFileContents();
  }
}
