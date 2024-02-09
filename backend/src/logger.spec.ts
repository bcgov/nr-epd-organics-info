import { logger } from './logger';
import * as lodash from 'lodash';

jest.mock('lodash', () => {
  return {
    __esModule: true,
    ...jest.requireActual('lodash'),
  };
});
describe('logger', () => {
  it('should create logger instance', () => {
    expect(logger).toBeDefined();
  });

  it('should format correctly', () => {
    const lodashOmitSpy = jest.spyOn(lodash, 'omit');

    // No message
    const error = new Error();
    logger.error(error);
    expect(lodashOmitSpy).toHaveBeenCalled();

    const error2 = new Error({ message: 'With object message' } as any);
    logger.error(error2);
  });
});
