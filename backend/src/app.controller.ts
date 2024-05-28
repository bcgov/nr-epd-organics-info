import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OmrrResponse } from './v1/types/omrr-response';
import { AmsOracleConnectorService } from './v1/ams-oracle-connector/ams.oracle.connector.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly amsOracleConnectorService: AmsOracleConnectorService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/omrr')
  async getAllOmrrRecords(): Promise<OmrrResponse> {
    return this.amsOracleConnectorService.getLatestOmrrDataFromCache();
  }
}
