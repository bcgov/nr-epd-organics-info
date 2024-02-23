import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3'
import * as process from 'process'
import { logger } from '../../logger'
import { Readable } from 'stream'
import Papa from 'papaparse'
import { OmrrData } from '../types/omrr-data'

@Injectable()
export class ObjectStoreService implements OnModuleDestroy, OnModuleInit {
  private readonly _s3Client: S3Client
  private _omrrData: OmrrData[] = []

  constructor() {
    this._s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.OS_ACCESS_KEY_ID,
        secretAccessKey: process.env.OS_SECRET_ACCESS_KEY_ID,
      },
      endpoint: process.env.OS_ENDPOINT,
      forcePathStyle: true,
      region: 'ca-central-1',
    })
  }

  async onModuleInit() {
    try {
      logger.info('Initializing ObjectStoreService');
      await this.getLatestOmrrDataFromObjectStore()
    } catch (e) {
      logger.error(e)
      process.exit(1)
    }
  }

  onModuleDestroy() {
    this._s3Client.destroy()
  }

  async parseCSVToObject(csv: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(csv, {
        header: true,
        complete: (results: any) => {
          resolve(results.data)
        },
        error: (error: any) => {
          reject(error)
        },
      })
    })
  }

  async convertCSVToJson(stream: Readable): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let csvData = ''
      stream.on('data', (chunk) => {
        csvData += chunk
      })
      stream.on('end', async () => {
        try {
          const jsonData = await this.parseCSVToObject(csvData)
          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      })
      stream.on('error', (error) => {
        reject(error)
      })
    })
  }

  async getLatestOMRRFileContents(): Promise<OmrrData[]> {
    return this._omrrData
  }

  async getLatestOmrrDataFromObjectStore(): Promise<OmrrData[]> {
    try {
      const response = await this._s3Client.send(
        new ListObjectsCommand({ Bucket: process.env.OS_BUCKET }),
      )
      let sortedData: any = response.Contents.sort((a: any, b: any) => {
        const modifiedDateA: any = new Date(a.LastModified)
        const modifiedDateB: any = new Date(b.LastModified)
        return modifiedDateB - modifiedDateA
      })
      const fileName = sortedData[0]?.Key
      logger.info(`fileName is ${fileName}`)

      const result = await this._s3Client.send(
        new GetObjectCommand({ Bucket: process.env.OS_BUCKET, Key: fileName }),
      )
      const fileStream: any = result?.Body
      if (fileStream) {
        this._omrrData = await this.convertCSVToJson(fileStream)
        return this._omrrData
      }
    } catch (e) {
    }

    throw new Error('No file found')
  }
}
