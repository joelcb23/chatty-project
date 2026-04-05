import { Router } from "express";
import {
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import * as AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(AuthMiddleware.verifyAuth);

router.get("/", getUsers);
router.get("/:email", getUserByEmail);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

export default router;
