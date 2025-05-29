import { Router } from "express";
import { getConversations } from "../controllers/conversation.controller.js";
import { getUsers } from "../controllers/users.controller.js";
import { getMessagesByConversationId } from "../controllers/messages.controller.js";

const router = Router();

router.get("/chats", getConversations);
router.get("/users", getUsers);
router.get("/messages/:otherUserId", getMessagesByConversationId);

export default router;
