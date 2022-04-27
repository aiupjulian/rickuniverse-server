import httpStatus from "http-status";
import { ApiError } from "../utils/errors.js";

export function notFoundHandler(req, res, next) {
  next(
    new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: httpStatus[httpStatus.NOT_FOUND],
    })
  );
}

export function errorConverterHandler(err, req, res, next) {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError({ statusCode, message, stack: err.stack });
  }
  next(error);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let { statusCode, message } = err;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).json(response);
}
