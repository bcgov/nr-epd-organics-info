import { logger } from './logger';

describe('logger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create logger instance', () => {
    expect(logger).toBeDefined();
  });

  it('should format correctly', () => {
    const transportLogSpy = jest.spyOn(
      logger.transports[0] as unknown as {
        log: (info: Record<PropertyKey, unknown>, cb: () => void) => void;
      },
      'log',
    );

    // No message
    const error = new Error();
    logger.error(error);
    expect(transportLogSpy).toHaveBeenCalledTimes(1);
    const noMsgInfo = transportLogSpy.mock.calls[0]?.[0];
    expect(String(noMsgInfo?.[Symbol.for('message')])).toContain('[object Object]');

    const error2 = new Error({ message: 'With object message' } as unknown as string);
    logger.error(error2);
    expect(transportLogSpy).toHaveBeenCalledTimes(2);

    logger.error({ message: { nested: true } });
    expect(transportLogSpy).toHaveBeenCalledTimes(3);
    const objMsgInfo = transportLogSpy.mock.calls[2]?.[0];
    expect(String(objMsgInfo?.[Symbol.for('message')])).toContain('{"nested":true}');
  });
});
