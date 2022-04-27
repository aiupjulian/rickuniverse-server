import httpStatus from "http-status";

class ApiError extends Error {
  constructor({
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    message,
    stack,
  }) {
    message = message || httpStatus[statusCode];
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
