import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AmsOracleConnectorService } from '../ams-oracle-connector/ams.oracle.connector.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly amsOracleConnectorService: AmsOracleConnectorService) {

  }

  @Cron('0 0 0/1 * * *')
  async refreshCache() {
    this.logger.log('refresh cache every hour');
    await this.amsOracleConnectorService.getOMRRDataFromAMS();
  }

}
