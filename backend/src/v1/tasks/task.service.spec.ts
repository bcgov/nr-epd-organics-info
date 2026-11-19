import { Logger } from '@nestjs/common';

describe('TasksService', () => {
  const origAppStatusFlag = process.env.OMRR_APP_STATUS_FLAG;
  const origAuthzDocsFlag = process.env.OMRR_AUTHZ_DOCS_FLAG;

  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    if (origAppStatusFlag === undefined) {
      delete process.env.OMRR_APP_STATUS_FLAG;
    } else {
      process.env.OMRR_APP_STATUS_FLAG = origAppStatusFlag;
    }
    if (origAuthzDocsFlag === undefined) {
      delete process.env.OMRR_AUTHZ_DOCS_FLAG;
    } else {
      process.env.OMRR_AUTHZ_DOCS_FLAG = origAuthzDocsFlag;
    }
    jest.restoreAllMocks();
  });

  it('refreshes only OMRR data when optional flags are unset', async () => {
    delete process.env.OMRR_APP_STATUS_FLAG;
    delete process.env.OMRR_AUTHZ_DOCS_FLAG;

    const { TasksService } = await import('./task.service');
    const mockConnector = {
      getOMRRDataFromAMS: jest.fn().mockResolvedValue(undefined),
      getOMRRApplicationStatusFromAMS: jest.fn().mockResolvedValue(undefined),
      getOMRRAuthorizationDocumentsFromAMS: jest
        .fn()
        .mockResolvedValue(undefined),
    };

    const service = new TasksService(mockConnector as never);
    await service.refreshCache();

    expect(mockConnector.getOMRRDataFromAMS).toHaveBeenCalledTimes(1);
    expect(
      mockConnector.getOMRRApplicationStatusFromAMS,
    ).not.toHaveBeenCalled();
    expect(
      mockConnector.getOMRRAuthorizationDocumentsFromAMS,
    ).not.toHaveBeenCalled();
  });

  it('refreshes application status and authorization documents when flags are true', async () => {
    process.env.OMRR_APP_STATUS_FLAG = 'true';
    process.env.OMRR_AUTHZ_DOCS_FLAG = 'true';

    const { TasksService } = await import('./task.service');
    const mockConnector = {
      getOMRRDataFromAMS: jest.fn().mockResolvedValue(undefined),
      getOMRRApplicationStatusFromAMS: jest.fn().mockResolvedValue(undefined),
      getOMRRAuthorizationDocumentsFromAMS: jest
        .fn()
        .mockResolvedValue(undefined),
    };

    const service = new TasksService(mockConnector as never);
    await service.refreshCache();

    expect(mockConnector.getOMRRDataFromAMS).toHaveBeenCalledTimes(1);
    expect(
      mockConnector.getOMRRApplicationStatusFromAMS,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockConnector.getOMRRAuthorizationDocumentsFromAMS,
    ).toHaveBeenCalledTimes(1);
  });
});
