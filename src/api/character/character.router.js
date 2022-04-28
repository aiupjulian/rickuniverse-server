import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { getCharacters, getCharacter } from "./character.controller.js";

const router = express.Router();

router.get("/", verifyToken, async function (req, res) {
  const characters = await getCharacters(req.user.username);
  res.json(characters);
});

router.get("/:id", verifyToken, async function (req, res) {
  const character = await getCharacter(req.user.username, req.params.id);
  res.json(character);
});

export default router;
