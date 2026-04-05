import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  refreshToken,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
