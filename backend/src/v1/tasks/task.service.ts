import {Injectable} from '@nestjs/common'
import {Cron} from '@nestjs/schedule'
import {logger} from '../../logger'
import {AmsOracleConnectorService} from "../ams-oracle-connector/ams.oracle.connector.service";

@Injectable()
export class TasksService {

  constructor(private readonly amsOracleConnectorService: AmsOracleConnectorService) {

  }

  @Cron('0 0/5 * * * *')
  async refreshCache() {
    logger.info('refresh cache every 5 minutes')
    await this.amsOracleConnectorService.getOMRRDataFromAMS()
  }

}
