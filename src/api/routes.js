import express from "express";
import authRouter from "./auth/auth.router.js";
import characterRouter from "./character/character.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/character", characterRouter);

export default router;
