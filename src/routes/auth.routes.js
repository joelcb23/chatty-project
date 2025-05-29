import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyTk,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/verify", verifyTk);
router.post("/logout", logout);

export default router;
