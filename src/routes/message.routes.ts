// src/routes/message.routes.ts

import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "../controllers/message.controller";

const router = Router({ mergeParams: true });

router.get("/", getMessages);
router.post("/", createMessage);
router.put("/", updateMessage);
router.delete("/", deleteMessage);

export default router;
