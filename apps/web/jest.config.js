
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^better-auth$": "<rootDir>/__mocks__/better-auth.js",
    "^better-auth/next$": "<rootDir>/__mocks__/better-auth-next.js"
  },
};
