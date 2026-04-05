import { Router } from "express";
import { getUsers, getUserByEmail } from "../controllers/user.controller";
import * as AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(AuthMiddleware.verifyAuth);

router.get("/", getUsers);
router.get("/:email", getUserByEmail);

export default router;
