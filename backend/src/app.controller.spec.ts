import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmsOracleConnectorService } from './v1/ams-oracle-connector/ams.oracle.connector.service';
import { HttpModule } from '@nestjs/axios';
import { OmrrResponse } from './v1/types/omrr-response';
import { OmrrApplicationStatusResponse } from './v1/types/omrr-application-status';

describe('AppController', () => {
  let appController: AppController;
  let amsConnectorService: AmsOracleConnectorService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, AmsOracleConnectorService],
    }).compile();
    amsConnectorService = await app.resolve<AmsOracleConnectorService>(
      AmsOracleConnectorService,
    );
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello Backend!"', () => {
      expect(appController.getHello()).toBe('Hello Backend!');
    });
  });
  describe('getAllOmrrRecords', () => {
    it('should return an object', async () => {
      //mock the AMSOracleConnectorService call
      jest
        .spyOn(amsConnectorService, 'getLatestOmrrDataFromCache')
        .mockImplementation(async () => {
          const res: OmrrResponse = {
            lastModified: new Date().toISOString(),
            omrrData: [
              {
                Manure: false,
                'Untreated and Unprocessed Wood Residuals': false,
                'Domestic Septic Tank Sludge': false,
                'Operation Type': null,
                Latitude: 49.028961,
                'Yard Waste': false,
                'Fish Wastes': false,
                Whey: false,
                'Animal Bedding': false,
                Biosolids: false,
                'Hatchery Waste': false,
                'Last Amendment Date': new Date(),
                'Intended Dates of Land Application': null,
                'Authorization Status': 'Inactive',
                'Authorization Number': 11123,
                'Waste Discharge Regulation': null,
                'Milk Processing Waste': false,
                'Material Land Applied': null,
                'Poultry Carcasses': false,
                'Authorization Type': 'Notification',
                'Effective/Issue Date': new Date(),
                Longitude: -123.805217,
                'Facility Location': 'LOT 10, OYSTER DISTRICT',
                'Type of Compost Produced': null,
                'Facility Design Capacity (t/y)': null,
                'Brewery Waste/Wine Waste': false,
                'Regulated Party': 'WYNDLOW WOOD WASTE REDUCTION INC.',
                'Food Waste': false,
              },
            ],
          };
          return res;
        });
      const result = await appController.getAllOmrrRecords();
      expect(result).toBeTruthy();
      expect(result.omrrData).toHaveLength(1);
    });
  });
  describe('getOmrrApplicationStatus', () => {
    it('should return an array', async () => {
      const result: OmrrApplicationStatusResponse[] = [
        {
          'Authorization Number': 108485,
          'Job Tracking Number': 386999,
          'Job Type': 'Authorization Amendment',
          'Authorization Type': 'Permit',
          Status: 'In Review',
          'Received Date': '2019-09-27',
        },
        {
          'Authorization Number': 108531,
          'Job Tracking Number': 384058,
          'Job Type': 'Authorization Amendment',
          'Authorization Type': 'Operational Certificate',
          Status: 'In Review',
          'Received Date': '2019-05-23',
        },
        {
          'Authorization Number': 108536,
          'Job Tracking Number': 433877,
          'Job Type': 'Authorization Amendment',
          'Authorization Type': 'Permit',
          Status: 'Pending Final Application',
          'Received Date': '2024-03-07',
        },
      ];
      jest
        .spyOn(amsConnectorService, 'getLatestOmrrApplicationStatusFromCache')
        .mockImplementation(async () => {
          return result;
        });
      const omrrApplicationStatus =
        await appController.getOmrrApplicationStatus();
      expect(omrrApplicationStatus).toBeTruthy();
      expect(omrrApplicationStatus).toHaveLength(3);
    });
  });
  describe('getOmrrAuthorizationDocuments', () => {
    it('should return an object', async () => {
      jest
        .spyOn(amsConnectorService, 'getLatestOmrrAuthzDocsFromCache')
        .mockImplementation(async () => {
          return [
            {
              'Authorization Number': 108485,
              doc_links: [
                {
                  DocumentObjectID: 123,
                  Description: 'desc',
                  Publiclyviewable: 'Y',
                  Filename: 'file1.pdf',
                },
              ],
            },
            {
              'Authorization Number': 108486,
              doc_links: [
                {
                  DocumentObjectID: 124,
                  Description: 'desc',
                  Publiclyviewable: 'Y',
                  Filename: 'file2.pdf',
                },
              ],
            },
            {
              'Authorization Number': 108487,
              doc_links: [
                {
                  DocumentObjectID: 125,
                  Description: 'desc',
                  Publiclyviewable: 'Y',
                  Filename: 'file3.pdf',
                },
              ],
            },
          ];
        });
      const omrrAuthorizationDocuments =
        await appController.getOmrrAuthorizationDocs();
      expect(omrrAuthorizationDocuments).toBeTruthy();
      expect(omrrAuthorizationDocuments).toHaveLength(3);
    });
  });
});
