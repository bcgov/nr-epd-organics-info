import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AmsOracleConnectorService } from '../ams-oracle-connector/ams.oracle.connector.service';
const OMRR_AUTHZ_DOCS_FLAG = process.env.OMRR_AUTHZ_DOCS_FLAG // put the code behind this feature flag to control hitting NR Oracle Service
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly amsOracleConnectorService: AmsOracleConnectorService) {

  }

  @Cron('0 0 0/1 * * *')
  async refreshCache() {
    this.logger.log('refresh cache every hour');
    await this.amsOracleConnectorService.getOMRRDataFromAMS();
    if(process.env.OMRR_APP_STATUS_FLAG === 'true'){
      await this.amsOracleConnectorService.getOMRRApplicationStatusFromAMS();
    }
    if(OMRR_AUTHZ_DOCS_FLAG === 'true') {
      await this.amsOracleConnectorService.getOMRRAuthorizationDocumentsFromAMS();
    }
  }

}
