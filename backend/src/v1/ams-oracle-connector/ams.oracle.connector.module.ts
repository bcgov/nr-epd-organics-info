import { Module } from '@nestjs/common';
import { AmsOracleConnectorService } from './ams.oracle.connector.service';

@Module({
  providers: [AmsOracleConnectorService],
  exports: [AmsOracleConnectorService]
})
export class AmsOracleConnectorModule {

}