import jwt from "jsonwebtoken";
import { parse } from "cookie";
import prisma from "../db.js";
import config from "../config/config.js";

export const getMessagesByConversationId = async (req, res) => {
  const otherUserId = req.params.otherUserId;
  try {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const token = cookies.token;
    // check if token exists
    if (!token) return res.status(403).json({ message: "No token provided" });
    // verify token
    const decoded = jwt.verify(token, config.SECRET);
    const conversations = await prisma.conversation.findFirst({
      where: {
        isGroup: false,
        Participants: {
          every: {
            userId: { in: [decoded.userId, Number(otherUserId)] },
          },
        },
      },
    });
    if (!conversations)
      return res.status(204).json({ message: "No conversation found" });
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversations.id,
      },
    });
    if (!messages)
      return res.status(404).json({ message: "No messages found" });
    res.status(200).json({ messages });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: error.message });
  }
};
