/**
 * Unit tests for AMS Oracle Connector Service
 */

import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AmsOracleConnectorService } from './ams.oracle.connector.service';
import { OMRR_QUERY } from './omrr-query';
import { OMRR_APP_STATUS_QUERY } from './omrr-application-status-query';
import { OMRR_AUTHZ_DOCS_QUERY } from './omrr-authz-docs-query';
import { OmrrData } from '../types/omrr-data';
import { OmrrApplicationStatusResponse } from '../types/omrr-application-status';
import { OmrrAuthzDocsQueryResponse } from '../types/omrr-authz-docs-response';

describe('AmsOracleConnectorService', () => {
  let service: AmsOracleConnectorService;
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    loggerErrorSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmsOracleConnectorService],
    }).compile();

    service = module.get<AmsOracleConnectorService>(AmsOracleConnectorService);
  });

  afterEach(() => {
    delete process.env.OMRR_APP_STATUS_FLAG;
    delete process.env.OMRR_AUTHZ_DOCS_FLAG;
    jest.restoreAllMocks();
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
      const getAuthzDocsFromAMS = jest
        .spyOn(service, 'getOMRRAuthorizationDocumentsFromAMS')
        .mockResolvedValue(undefined);
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
      process.env.OMRR_APP_STATUS_FLAG = 'true';
      jest.spyOn(service, 'getOMRRDataFromAMS').mockResolvedValue(undefined);
      jest
        .spyOn(service, 'getOMRRApplicationStatusFromAMS')
        .mockRejectedValue(new Error('Error'));

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

      await service.onModuleInit();

      expect(exitSpy).toHaveBeenCalledWith(128);
    });

    it('should exit the process with code 128 if there is an error calling getOMRRAuthorizationDocumentsFromAMS', async () => {
      process.env.OMRR_AUTHZ_DOCS_FLAG = 'true';
      jest.spyOn(service, 'getOMRRDataFromAMS').mockResolvedValue(undefined);
      jest
        .spyOn(service, 'getOMRRAuthorizationDocumentsFromAMS')
        .mockRejectedValue(new Error('Error'));

      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

      await service.onModuleInit();

      expect(exitSpy).toHaveBeenCalledWith(128);
    });
  });

  const mockFetchJson = (status: number, data?: unknown) =>
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      status,
      json: async () => data,
    } as Response);

  const expectFetchPost = (fetchSpy: jest.SpyInstance, sql: string) => {
    expect(fetchSpy).toHaveBeenCalledWith(process.env.NR_ORACLE_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.NR_ORACLE_SERVICE_KEY,
      },
      body: JSON.stringify({
        queryType: 'READ',
        sql,
      }),
    });
  };

  describe('getOMRRDataFromAMS', () => {
    it('should get OMRR data from AMS and tag Red Meat Waste for authorization 111479 only', async () => {
      const omrrData: Partial<OmrrData>[] = [
        { 'Authorization Number': 111479 },
        { 'Authorization Number': 12398 },
      ];
      const fetchSpy = mockFetchJson(200, omrrData);

      const result = await service.getOMRRDataFromAMS();

      expectFetchPost(fetchSpy, OMRR_QUERY);
      expect(result.lastModified).toEqual(expect.any(String));
      expect(result.omrrData[0]['Red Meat Waste']).toBe(true);
      expect(result.omrrData[1]['Red Meat Waste']).toBe(false);
    });

    it('should throw an error if OMRR data endpoint returns non-200 status', async () => {
      mockFetchJson(503);

      await expect(service.getOMRRDataFromAMS()).rejects.toThrow(
        'Error Getting OMRR data from AMS',
      );
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Error Getting OMRR data from AMS',
        503,
      );
    });

    it('should throw an error if there is an error getting OMRR data from AMS', async () => {
      const error = new Error('Error Getting OMRR data from AMS');
      jest.spyOn(globalThis, 'fetch').mockRejectedValue(error);

      await expect(service.getOMRRDataFromAMS()).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(error);
    });

    it('should throw an error if response JSON parsing fails', async () => {
      const parseError = new SyntaxError('Unexpected token');
      jest.spyOn(globalThis, 'fetch').mockResolvedValue({
        status: 200,
        json: async () => {
          throw parseError;
        },
      } as unknown as Response);

      await expect(service.getOMRRDataFromAMS()).rejects.toThrow(
        'Error Getting OMRR data from AMS',
      );
      expect(loggerErrorSpy).toHaveBeenCalledWith(parseError);
    });
  });

  describe('getLatestOmrrDataFromCache', () => {
    it('should return the latest OMRR data from cache', async () => {
      const omrrData: Partial<OmrrData>[] = [{ 'Authorization Number': 12398 }];
      mockFetchJson(200, omrrData);
      const expected = await service.getOMRRDataFromAMS();

      const result = await service.getLatestOmrrDataFromCache();

      expect(result).toEqual(expected);
    });
  });

  describe('getOMRRApplicationStatusFromAMS', () => {
    it('should get OMRR application status from AMS', async () => {
      const omrrApplicationStatus: OmrrApplicationStatusResponse[] = []; // Mocked OMRR application status
      const fetchSpy = mockFetchJson(200, omrrApplicationStatus);

      const result = await service.getOMRRApplicationStatusFromAMS();

      expectFetchPost(fetchSpy, OMRR_APP_STATUS_QUERY);
      expect(result).toEqual(omrrApplicationStatus);
    });

    it('should throw an error if there is an error getting OMRR application status from AMS', async () => {
      const error = new Error('Error Getting OMRR Application Status from AMS');
      jest.spyOn(globalThis, 'fetch').mockRejectedValue(error);

      await expect(
        service.getOMRRApplicationStatusFromAMS(),
      ).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(error);
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
    it('should group documents by Authorization Number across multiple authorizations', async () => {
      const omrrAuthzDocs: OmrrAuthzDocsQueryResponse[] = [
        {
          'Authorization Number': 123,
          DocumentObjectID: 124,
          Description: 'desc',
          Publiclyviewable: 'Y',
          Filename: 'file1.pdf',
        },
        {
          'Authorization Number': 123,
          DocumentObjectID: 125,
          Description: 'desc2',
          Publiclyviewable: 'Y',
          Filename: 'file2.pdf',
        },
        {
          'Authorization Number': 456,
          DocumentObjectID: 126,
          Description: 'desc3',
          Publiclyviewable: 'Y',
          Filename: 'file3.pdf',
        },
      ];
      const fetchSpy = mockFetchJson(200, omrrAuthzDocs);

      const result = await service.getOMRRAuthorizationDocumentsFromAMS();

      expectFetchPost(fetchSpy, OMRR_AUTHZ_DOCS_QUERY);
      expect(result).toHaveLength(2);
      expect(result[0]['Authorization Number']).toBe(123);
      expect(result[0].doc_links).toHaveLength(2);
      expect(result[1]['Authorization Number']).toBe(456);
      expect(result[1].doc_links).toHaveLength(1);
      expect(await service.getLatestOmrrAuthzDocsFromCache()).toEqual(result);
    });

    it('should throw error if status is not 200', async () => {
      mockFetchJson(400);
      const error = new Error(
        'Error Getting OMRR Authorization Documents from AMS',
      );
      await expect(
        service.getOMRRAuthorizationDocumentsFromAMS(),
      ).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Error Getting OMRR Authorization Documents from AMS',
        400,
      );
    });

    it('should throw an error if there is an error getting OMRR authorization documents from AMS', async () => {
      const error = new Error(
        'Error Getting OMRR Authorization Documents from AMS',
      );
      jest.spyOn(globalThis, 'fetch').mockRejectedValue(error);

      await expect(
        service.getOMRRAuthorizationDocumentsFromAMS(),
      ).rejects.toThrow(error);
      expect(loggerErrorSpy).toHaveBeenCalledWith(error);
    });
  });
});
