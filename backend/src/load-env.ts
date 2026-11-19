import { existsSync } from 'node:fs';

/**
 * Load environment variables from a local .env file when present,
 * preserving any variables already set by the runtime.
 */
export function loadEnvIfPresent(envPath: string = '.env'): void {
  if (existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
}

loadEnvIfPresent();
