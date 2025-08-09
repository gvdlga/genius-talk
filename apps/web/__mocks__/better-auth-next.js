const toNextJsHandler = jest.fn((authInstance, handlers) => {
  // This is the function that Next.js will call as the API route handler
  return async (req, res) => {
    const method = req.method;
    if (method && handlers[method]) {
      await handlers[method](req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
});

module.exports = {
  toNextJsHandler,
};