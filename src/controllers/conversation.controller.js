import jwt from "jsonwebtoken";
import { parse } from "cookie";
import prisma from "../db.js";
import config from "../config/config.js";

export const getConversations = async (req, res) => {
  try {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    // console.log(cookies.token);
    const token = cookies.token;
    // console.log(token);
    // check if token exists
    if (!token) return res.status(403).json({ message: "No token provided" });
    // verify token
    const decoded = jwt.verify(token, config.SECRET);
    console.log(decoded.userId);
    // req.user = decoded;
    const conversations = await prisma.conversation.findMany({
      where: {
        isGroup: false,
        Participants: {
          some: {
            userId: { in: [decoded.userId] },
          },
        },
      },
      include: {
        Participants: {
          include: { Users: true },
        },
        Messages: true,
      },
    });
    if (!conversations)
      return res.status(404).json({ message: "No conversations found" });
    res.status(200).json({ conversations });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: error.message });
  }
};
