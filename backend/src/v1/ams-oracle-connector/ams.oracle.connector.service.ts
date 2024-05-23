import {Injectable, OnModuleInit} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {OmrrResponse} from "../types/omrr-response";
import {AxiosResponse} from "axios";
import {OmrrData} from "../types/omrr-data";
import {OMRR_QUERY} from "./omrr-query";
import {logger} from "../../logger";

let omrrResponse: OmrrResponse;
const NR_ORACLE_SERVICE_URL = process.env.NR_ORACLE_SERVICE_URL;
const NR_ORACLE_SERVICE_KEY = process.env.NR_ORACLE_SERVICE_KEY;

@Injectable()
export class AmsOracleConnectorService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {
  }

  /**
   * This function will be called by the cron job in the TasksService
   *
   * This function will pass the API key in the http header "X-API-Key"
   * to the AMS Oracle service to get the latest OMRR data.
   * This will POST the query using POST endpoint of NR Oracle Service
   * sample:
   * POST http://localhost:9080/
   * Content-Type: application/json
   * X-API-Key: ****
   *
   * {
   *   "queryType": "READ",
   *   "sql": "  ****"
   * }
   */


  async getOMRRDataFromAMS() {
    logger.info('Getting OMRR data from AMS');
    try {
      const response: AxiosResponse<OmrrData[]> = await this.httpService.axiosRef.post(
        NR_ORACLE_SERVICE_URL,
        {
          "queryType": "READ",
          "sql": OMRR_QUERY
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': NR_ORACLE_SERVICE_KEY
          }
        }
      );

      if (response.status === 200) {
        omrrResponse = {
          lastModified: new Date().toISOString(),
          omrrData: response.data
        };
        logger.info('Got OMRR data from AMS');
        return omrrResponse;
      } else {
        logger.error('Error Getting OMRR data from AMS', response.status);
      }


    } catch (error) {
      logger.error(error);
    }
  }

  async getLatestOmrrDataFromCache(): Promise<OmrrResponse> {
    return omrrResponse;
  }

  async onModuleInit() {
    if(!omrrResponse){ // avoid multiple execution
      logger.info('Initializing AmsOracleConnectorService');
      await this.getOMRRDataFromAMS();
    }

  }
}
