import express from "express";
import characterRouter from "./character/character.router.js";

const router = express.Router();

router.use("/character", characterRouter);

export default router;
