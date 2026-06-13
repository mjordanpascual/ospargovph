// Example controller structure
// Controllers contain business logic and handle requests

const exampleController = {
  // Example method
  getData: async (req, res, next) => {
    try {
      // Your logic here
      res.json({ message: 'Data retrieved' });
    } catch (error) {
      next(error);
    }
  },

  postData: async (req, res, next) => {
    try {
      // Your logic here
      res.status(201).json({ message: 'Data created' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = exampleController;
