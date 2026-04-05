// src/routes/conversation.routes.ts

import { Router } from "express";
import * as AuthMiddleware from "../middlewares/auth.middleware";
import {
  createConversation,
  createGroupConversation,
  deleteConversation,
  getConversations,
} from "../controllers/conversation.controller";

const router = Router();

router.use(AuthMiddleware.verifyAuth);

router.get("/", getConversations);
router.post("/", createConversation);
router.post("/group", createGroupConversation);
router.delete("/:conversationId", deleteConversation);

export default router;
