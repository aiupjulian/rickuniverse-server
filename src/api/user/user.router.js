import express from "express";
import httpStatus from "http-status";
import { verifyToken } from "../../middleware/auth.js";
import { ApiError } from "../../utils/errors.js";
import { addToFavs, getFavs, removeFromFavs } from "./user.controller.js";

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get("/me/favs", verifyToken, async function (req, res, next) {
  const favs = await getFavs(req.user.username);
  res.json(favs);
});

router.put("/me/favs/:id", verifyToken, async function (req, res, next) {
  const { id: characterId } = req.params;
  const parsedCharacterId = Number(characterId);
  if (isNaN(parsedCharacterId)) {
    return next(
      new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Please provide a number",
      })
    );
  }

  await addToFavs(req.user.username, parsedCharacterId);
  res.sendStatus(httpStatus.OK);
});

router.delete("/me/favs/:id", verifyToken, async function (req, res, next) {
  const { id: characterId } = req.params;
  const parsedCharacterId = Number(characterId);
  if (isNaN(parsedCharacterId)) {
    return next(
      new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Please provide a number",
      })
    );
  }

  await removeFromFavs(req.user.username, parsedCharacterId);
  res.sendStatus(httpStatus.OK);
});

export default router;
