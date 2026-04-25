/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@auth': '<rootDir>/src/utils/auth.ts',
    '@slices': '<rootDir>/src/services/slices',
    '@cookies': '<rootDir>/src/utils/cookie.ts',
    '@utils-types': '<rootDir>/src/utils/types.ts'
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  }
};

export default config;
