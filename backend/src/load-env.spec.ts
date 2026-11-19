import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadEnvIfPresent } from './load-env';

describe('loadEnvIfPresent', () => {
  let tempDir: string;
  let loadEnvSpy: jest.SpyInstance;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'load-env-test-'));
    loadEnvSpy = jest.spyOn(process, 'loadEnvFile').mockImplementation();
  });

  afterEach(() => {
    loadEnvSpy.mockRestore();
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('does nothing when the env file does not exist', () => {
    loadEnvIfPresent(join(tempDir, '.env.missing'));

    expect(loadEnvSpy).not.toHaveBeenCalled();
  });

  it('calls process.loadEnvFile when the env file exists', () => {
    const envPath = join(tempDir, '.env');
    writeFileSync(envPath, 'TEST_VAR=from-file\n', 'utf8');

    loadEnvIfPresent(envPath);

    expect(loadEnvSpy).toHaveBeenCalledWith(envPath);
  });
});
