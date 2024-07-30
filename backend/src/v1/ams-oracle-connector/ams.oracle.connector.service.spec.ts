/**
 * Unit tests for AMS Oracle Connector Service
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AmsOracleConnectorService } from './ams.oracle.connector.service';
import { HttpService } from '@nestjs/axios';
import { OmrrData } from '../types/omrr-data';
import { OmrrApplicationStatusResponse } from '../types/omrr-application-status';
import { OmrrAuthzDocsQueryResponse } from '../types/omrr-authz-docs-response'
import * as process from 'node:process'

describe('AmsOracleConnectorService', () => {
  let service: AmsOracleConnectorService;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmsOracleConnectorService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              post: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AmsOracleConnectorService>(AmsOracleConnectorService);
    httpService = module.get<HttpService>(HttpService);

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('onModuleInit', () => {
    it('should initialize AmsOracleConnectorService and call getOMRRDataFromAMS and getOMRRApplicationStatusFromAMS', async () => {
      process.env.OMRR_AUTHZ_DOCS_FLAG = 'true';
      process.env.OMRR_APP_STATUS_FLAG = 'true';
      const getOMRRDataFromAMS = jest
        .spyOn(service, 'getOMRRDataFromAMS')
        .mockResolvedValue(undefined);
      const getOMRRApplicationStatusFromAMS = jest
        .spyOn(service, 'getOMRRApplicationStatusFromAMS')
        .mockResolvedValue(undefined);
      const getAuthzDocsFromAMS = jest.spyOn(service, 'getOMRRAuthorizationDocumentsFromAMS').mockResolvedValue(undefined);
      await service.onModuleInit();

      expect(getOMRRDataFromAMS).toHaveBeenCalled();
      expect(getOMRRApplicationStatusFromAMS).toHaveBeenCalled();
      expect(getAuthzDocsFromAMS).toHaveBeenCalled();
    });

    it('should exit the process with code 128 if there is an error calling getOMRRDataFromAMS', async () => {
      jest
        .spyOn(service, 'getOMRRDataFromAMS')
        .mockRejectedValue(new Error('Error'));

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

      await service.onModuleInit();

      expect(exitSpy).toHaveBeenCalledWith(128);
    });

    it('should exit the process with code 128 if there is an error calling getOMRRApplicationStatusFromAMS', async () => {
      jest
        .spyOn(service, 'getOMRRApplicationStatusFromAMS')
        .mockRejectedValue(new Error('Error'));

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

      await service.onModuleInit();

      expect(exitSpy).toHaveBeenCalledWith(128);
    });
  });

  describe('getOMRRDataFromAMS', () => {
    it('should get OMRR data from AMS', async () => {
      const omrrData: OmrrData[] = []; // Mocked OMRR data
      const response = {
        status: 200,
        data: omrrData,
      };
      jest.spyOn(httpService.axiosRef, 'post').mockResolvedValue(response);

      const result = await service.getOMRRDataFromAMS();

      expect(result).toEqual({
        lastModified: expect.any(String),
        omrrData,
      });
    });

    it('should throw an error if there is an error getting OMRR data from AMS', async () => {
      const error = new Error('Error Getting OMRR data from AMS');
      jest.spyOn(httpService.axiosRef, 'post').mockRejectedValue(error);

      await expect(service.getOMRRDataFromAMS()).rejects.toThrowError(error);
    });
  });

  describe('getLatestOmrrDataFromCache', () => {
    it('should return the latest OMRR data from cache', async () => {
      const omrrData: OmrrData[] = []; // Mocked OMRR data
      service['omrrResponse'] = {
        lastModified: new Date().toISOString(),
        omrrData,
      };

      const result = await service.getLatestOmrrDataFromCache();

      expect(result).toEqual({
        lastModified: expect.any(String),
        omrrData,
      });
    });
  });

  describe('getOMRRApplicationStatusFromAMS', () => {
    it('should get OMRR application status from AMS', async () => {
      const omrrApplicationStatus: OmrrApplicationStatusResponse[] = []; // Mocked OMRR application status
      const response = {
        status: 200,
        data: omrrApplicationStatus,
      };
      jest.spyOn(httpService.axiosRef, 'post').mockResolvedValue(response);

      const result = await service.getOMRRApplicationStatusFromAMS();

      expect(result).toEqual(omrrApplicationStatus);
    });

    it('should throw an error if there is an error getting OMRR application status from AMS', async () => {
      const error = new Error('Error Getting OMRR Application Status from AMS');
      jest.spyOn(httpService.axiosRef, 'post').mockRejectedValue(error);

      await expect(
        service.getOMRRApplicationStatusFromAMS(),
      ).rejects.toThrowError(error);
    });
  });

  describe('getLatestOmrrApplicationStatusFromCache', () => {
    it('should return the latest OMRR application status from cache', async () => {
      const omrrApplicationStatus: OmrrApplicationStatusResponse[] = []; // Mocked OMRR application status
      service['omrrApplicationStatusResponse'] = omrrApplicationStatus;

      const result = await service.getLatestOmrrApplicationStatusFromCache();

      expect(result).toEqual(omrrApplicationStatus);
    });
  });

  describe('getOMRRAuthorizationDocumentsFromAMS', () => {
    it('should get OMRR authorization documents from AMS', async () => {
      const omrrAuthzDocs: OmrrAuthzDocsQueryResponse[] = [
        {
          'Authorization Number': 123,
          DocumentObjectID: 124,
          Description: 'desc',
          Publiclyviewable: 'Y',
        },
        {
          'Authorization Number': 123,
          DocumentObjectID: 125,
          Description: 'desc',
          Publiclyviewable: 'Y',
        },
      ]; // Mocked OMRR authorization documents
      const response = {
        status: 200,
        data: omrrAuthzDocs,
      };
      jest.spyOn(httpService.axiosRef, 'post').mockResolvedValue(response);

      const result = await service.getOMRRAuthorizationDocumentsFromAMS();

      expect(result).toHaveLength(1)
      expect(result[0].doc_links).toHaveLength(2)
    });

    it('should throw error if status is not 200', async () => {
      const response = {
        status: 400,
        data: undefined,
      };
      jest.spyOn(httpService.axiosRef, 'post').mockResolvedValue(response);
      const error = new Error('Error Getting OMRR Authorization Documents from AMS');
      await expect(
        service.getOMRRAuthorizationDocumentsFromAMS(),
      ).rejects.toThrow(error);
    });

    it('should throw an error if there is an error getting OMRR authorization documents from AMS', async () => {
      const error = new Error('Error Getting OMRR Authorization Documents from AMS');
      jest.spyOn(httpService.axiosRef, 'post').mockRejectedValue(error);

      await expect(
        service.getOMRRAuthorizationDocumentsFromAMS(),
      ).rejects.toThrow(error);
    });
  });

});
