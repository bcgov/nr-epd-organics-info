import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { OmrrResponse } from '../types/omrr-response'
import { AxiosResponse } from 'axios'
import { OmrrData } from '../types/omrr-data'
import { OMRR_QUERY } from './omrr-query'
import { OmrrApplicationStatusResponse } from '../types/omrr-application-status'
import { OMRR_APP_STATUS_QUERY } from './omrr-application-status-query'
import { OMRR_AUTHZ_DOCS_QUERY } from './omrr-authz-docs-query'
import { OmrrAuthzDocsQueryResponse, OmrrAuthzDocsResponse } from '../types/omrr-authz-docs-response'

let omrrResponse: OmrrResponse | null = null
let omrrApplicationStatusResponse: OmrrApplicationStatusResponse[] | null = []
let omrrAuthzDocsResponse: OmrrAuthzDocsResponse[] | null = [] // initialize to empty array
const NR_ORACLE_SERVICE_URL = process.env.NR_ORACLE_SERVICE_URL
const NR_ORACLE_SERVICE_KEY = process.env.NR_ORACLE_SERVICE_KEY

@Injectable()
export class AmsOracleConnectorService implements OnModuleInit {
  private readonly logger = new Logger(AmsOracleConnectorService.name)

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
    this.logger.verbose('Getting OMRR data from AMS')
    try {
      const response: AxiosResponse<OmrrData[]> =
        await this.httpService.axiosRef.post(
          NR_ORACLE_SERVICE_URL,
          {
            queryType: 'READ',
            sql: OMRR_QUERY,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': NR_ORACLE_SERVICE_KEY,
            },
          },
        )

      if (response.status === 200) {
        omrrResponse = {
          lastModified: new Date().toISOString(),
          omrrData: response.data,
        }
        this.logger.verbose('Got OMRR data from AMS')
        return omrrResponse
      } else {
        this.logger.error('Error Getting OMRR data from AMS', response.status)
        throw new Error('Error Getting OMRR data from AMS')
      }
    } catch (error) {
      this.logger.error(error)
      throw new Error('Error Getting OMRR data from AMS')
    }
  }

  async getLatestOmrrDataFromCache(): Promise<OmrrResponse> {
    return omrrResponse
  }

  async onModuleInit() {
    this.logger.verbose('Initializing AmsOracleConnectorService')
    if (!omrrResponse) {
      // avoid multiple execution
      try {
        await this.getOMRRDataFromAMS()
      } catch (error) {
        process.exit(128)
      }
    }
    if (omrrApplicationStatusResponse.length === 0 && process.env.OMRR_APP_STATUS_FLAG === 'true') {
      try {
        await this.getOMRRApplicationStatusFromAMS()
      } catch (error) {
        process.exit(128)
      }
    }
    if (omrrAuthzDocsResponse.length === 0 && process.env.OMRR_AUTHZ_DOCS_FLAG === 'true') {
      try {
        await this.getOMRRAuthorizationDocumentsFromAMS()
      } catch (error) {
        process.exit(128)
      }
    }
  }

  async getOMRRApplicationStatusFromAMS() {
    this.logger.verbose('Getting OMRR Application Status from AMS')
    try {
      const response: AxiosResponse<OmrrApplicationStatusResponse[]> =
        await this.httpService.axiosRef.post(
          NR_ORACLE_SERVICE_URL,
          {
            queryType: 'READ',
            sql: OMRR_APP_STATUS_QUERY,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': NR_ORACLE_SERVICE_KEY,
            },
          },
        )

      if (response.status === 200) {
        omrrApplicationStatusResponse = response.data
        this.logger.verbose('Got OMRR Application Status from AMS')
        return omrrApplicationStatusResponse
      } else {
        this.logger.error('Error Getting OMRR Application Status from AMS', response.status)
        throw new Error('Error Getting OMRR Application Status from AMS')
      }
    } catch (error) {
      this.logger.error(error)
      throw new Error('Error Getting OMRR Application Status from AMS')
    }
  }

  async getLatestOmrrApplicationStatusFromCache(): Promise<OmrrApplicationStatusResponse[]> {
    return omrrApplicationStatusResponse
  }

  async getOMRRAuthorizationDocumentsFromAMS() {
    this.logger.verbose('Getting OMRR Authorization Documents from AMS')
    try {
      const response: AxiosResponse<OmrrAuthzDocsQueryResponse[]> =
        await this.httpService.axiosRef.post(
          NR_ORACLE_SERVICE_URL,
          {
            queryType: 'READ',
            sql: OMRR_AUTHZ_DOCS_QUERY,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': NR_ORACLE_SERVICE_KEY,
            },
          },
        )

      if (response.status === 200) {
        const result: OmrrAuthzDocsQueryResponse[] = response.data
        // iterate over the results, if Authorization Number exists in the array, add the documents to the existing array,
        // else create a new document array and add it to the authorization number
        const omrrAuthzDocsResponseScoped: OmrrAuthzDocsResponse[] = []
        for (const row of result) {
          const authNum = row['Authorization Number']
          const doc = {
            DocumentObjectID: row['DocumentObjectID'],
            Description: row['Description'],
            Publiclyviewable: row['Publiclyviewable'],
          }
          if(omrrAuthzDocsResponseScoped?.length > 0) {
            const authNumIndex = omrrAuthzDocsResponseScoped.findIndex((auth) => auth['Authorization Number'] === authNum)
            if (authNumIndex === -1) {
              omrrAuthzDocsResponseScoped.push({
                'Authorization Number': authNum,
                doc_links: [doc],
              })
            } else {
              omrrAuthzDocsResponseScoped[authNumIndex].doc_links.push(doc)
            }
          }else{
            omrrAuthzDocsResponseScoped.push({
              'Authorization Number': authNum,
              doc_links: [doc],
            })
          }
        }
        this.logger.verbose('Got OMRR Authorization Documents from AMS')
        omrrAuthzDocsResponse = omrrAuthzDocsResponseScoped // replace the in memory cache with the scoped response.
        return omrrAuthzDocsResponse
      } else {
        this.logger.error('Error Getting OMRR Authorization Documents from AMS', response.status)
        throw new Error('Error Getting OMRR Authorization Documents from AMS')
      }
    } catch (error) {
      this.logger.error(error)
      throw new Error('Error Getting OMRR Authorization Documents from AMS')
    }
  }
  async getLatestOmrrAuthzDocsFromCache(): Promise<OmrrAuthzDocsResponse[]> {
    return omrrAuthzDocsResponse
  }
}
