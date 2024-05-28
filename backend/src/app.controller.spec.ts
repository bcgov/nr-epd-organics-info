import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectStoreService } from './v1/object-store/object.store.service';
import { AmsOracleConnectorService } from './v1/ams-oracle-connector/ams.oracle.connector.service';
import { HttpModule } from '@nestjs/axios';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, ObjectStoreService, AmsOracleConnectorService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello Backend!"', () => {
      expect(appController.getHello()).toBe('Hello Backend!');
    });
  });
});
