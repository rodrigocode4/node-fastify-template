export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*types.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/infrastructure/*',
    '<rootDir>/src/modules/base/*',
    '<rootDir>/src/server.ts',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/app.ts'
  ],
  coverageProvider: 'v8',
  moduleNameMapper: { '~/(.*)': '<rootDir>/src/$1' },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/infrastructure/test.setup.ts'],
  transform: { '.+\\.ts$': 'ts-jest' },
}
