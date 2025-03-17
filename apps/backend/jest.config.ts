import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
  },
};

export default config;
