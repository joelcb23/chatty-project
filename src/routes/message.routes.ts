// src/routes/message.routes.ts

import { Router } from "express";
import * as AuthMiddleware from "../middlewares/auth.middleware";
import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "../controllers/message.controller";

const router = Router({ mergeParams: true });

router.use(AuthMiddleware.verifyAuth);

router.get("/", getMessages);
router.post("/", createMessage);
router.put("/:messageId", updateMessage);
router.delete("/:messageId", deleteMessage);

export default router;
