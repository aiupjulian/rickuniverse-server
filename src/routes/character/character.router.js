import express from "express";
import { getCharacters } from "./character.service.js";

const router = express.Router();

router.get("/", async function (req, res, next) {
  const characters = await getCharacters();
  console.log(characters);
  res.send({ test: true });
});

export default router;
