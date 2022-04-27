import express from "express";
import authRouter from "./auth/auth.router.js";
import characterRouter from "./character/character.router.js";
// import userRouter from "./user/user.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/character", characterRouter);
// router.use("/user", userRouter);

export default router;
