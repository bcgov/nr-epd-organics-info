import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OmrrResponse } from './v1/types/omrr-response';
import { AmsOracleConnectorService } from './v1/ams-oracle-connector/ams.oracle.connector.service';
import { OmrrApplicationStatusResponse } from './v1/types/omrr-application-status'
import { OmrrAuthzDocsResponse } from './v1/types/omrr-authz-docs-response'

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
  @Get('/omrr/application-status')
  async getOmrrApplicationStatus(): Promise<OmrrApplicationStatusResponse[]> {
    return this.amsOracleConnectorService.getLatestOmrrApplicationStatusFromCache();
  }
  @Get('/omrr/authorization-docs')
  async getOmrrAuthorizationDocs(): Promise<OmrrAuthzDocsResponse[]> {
    return this.amsOracleConnectorService.getLatestOmrrAuthzDocsFromCache();
  }
}
