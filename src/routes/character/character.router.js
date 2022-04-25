import express from "express";
import { getCharacters, getCharacter } from "./character.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const characters = await getCharacters();
  res.send(characters);
});

router.get("/:id", async function (req, res) {
  const character = await getCharacter(req.params.id);
  res.send(character);
});

export default router;
