import express from "express";
import httpStatus from "http-status";
import { verifyToken } from "../../middleware/auth.js";
import { ApiError } from "../../utils/errors.js";
import {
  checkIsUsernameTaken,
  login,
  register,
} from "../auth/auth.controller.js";

const router = express.Router();

router.put("/me/favs/:id", verifyToken, async function (req, res, next) {
  const { id } = req.params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    return next(
      new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Please provide a number",
      })
    );
  }

  const token = await login(username, password);
  if (token) {
    res.sendStatus(httpStatus.OK);
  } else {
    return next(new ApiError({ statusCode: httpStatus.UNAUTHORIZED }));
  }
});

router.delete("/me/favs/:id", verifyToken, async function (req, res, next) {
  const { id } = req.params;

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
  res.sendStatus(httpStatus.OK);
  const token = await register(username, password);
  res.status(httpStatus.CREATED).json({ token });
});

export default router;
