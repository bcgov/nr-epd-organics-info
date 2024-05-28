import { Module } from '@nestjs/common';
import { AmsOracleConnectorService } from './ams.oracle.connector.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AmsOracleConnectorService],
  exports: [AmsOracleConnectorService]
})
export class AmsOracleConnectorModule {

}