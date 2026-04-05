// src/app.ts

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import conversationsRoutes from "./routes/conversation.routes";
import messagesRoutes from "./routes/message.routes";

import { AppError } from "./utils/AppError";
import { globalErrorHandler } from "./middlewares/globalErrorHandle";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/conversations/:conversationId/messages", messagesRoutes);
app.all(
  "*",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
  },
);

app.use(globalErrorHandler);
