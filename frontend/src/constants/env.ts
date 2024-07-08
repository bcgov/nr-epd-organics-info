const env = import.meta.env

export const isDevelopment = env.DEV
export const isTest = env.NODE_ENV === 'test'
export const isProduction = env.PROD
