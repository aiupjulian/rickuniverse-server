import express from "express";
import { verifyToken } from "../../middleware/auth.js";
import { getCharacters, getCharacter } from "./character.service.js";

const router = express.Router();

router.get("/", verifyToken, async function (req, res) {
  const characters = await getCharacters();
  res.json(characters);
});

router.get("/:id", verifyToken, async function (req, res) {
  const character = await getCharacter(req.params.id);
  res.json(character);
});

export default router;
