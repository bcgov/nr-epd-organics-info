import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ObjectStoreService } from './v1/object-store/object.store.service'
import { OmrrResponse } from './v1/types/omrr-response'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly objectStoreService: ObjectStoreService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/omrr')
  async getAllOmrrRecords(): Promise<OmrrResponse> {
    return this.objectStoreService.getLatestOMRRFileContents();
  }
}
