import express from "express";
import httpStatus from "http-status";
import { ApiError } from "../../utils/errors.js";
import { checkIsUsernameTaken, login, register } from "./auth.controller.js";

const router = express.Router();

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Username and password required",
      })
    );
  }

  const token = await login(username, password);
  if (token) {
    res.json({ token });
  } else {
    return next(new ApiError({ statusCode: httpStatus.UNAUTHORIZED }));
  }
});

router.post("/register", async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Username and password required",
      })
    );
  }

  const isUsernameTaken = await checkIsUsernameTaken(username);
  if (isUsernameTaken) {
    return next(new ApiError({ statusCode: httpStatus.CONFLICT }));
  }

  const token = await register(username, password);
  res.status(httpStatus.CREATED).json({ token });
});

export default router;
