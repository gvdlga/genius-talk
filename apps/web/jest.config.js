
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@better-auth/server-side-library$": "<rootDir>/__mocks__/@better-auth/server-side-library.js"
  },
};
