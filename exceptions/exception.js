class CustomError extends Error {
    constructor(message,name) {
      super(message);
    }
  }

module.exports = CustomError;