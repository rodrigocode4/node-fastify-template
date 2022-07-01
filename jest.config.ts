
export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    '<rootDir>/src/infrastructure/*',
    '<rootDir>/src/server.ts',
  ],
  coverageProvider: "v8",
  moduleNameMapper: { '~/(.*)': '<rootDir>/src/$1' },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/infrastructure/test.setup.ts'],
  transform: { '.+\\.ts$': 'ts-jest' },
};
