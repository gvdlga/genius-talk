module.exports = {
  betterAuth: jest.fn(() => ({
    validateToken: jest.fn(),
  })),
  validateToken: jest.fn(),
};