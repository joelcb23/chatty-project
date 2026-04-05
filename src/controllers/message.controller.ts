import express from "express";
import * as MessageService from "../services/message.service";
import { catchAsync } from "../utils/catchAsync";

export const getMessages = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const conversationId = req.params.conversationId;
    const messages = await MessageService.getMessagesByConversation({
      conversationId,
      userId,
    });
    res.status(200).json({ messages });
  },
);

export const createMessage = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const conversationId = req.params.conversationId;
    const content = req.body.content;
    const message = await MessageService.createNewMessage({
      content,
      conversationId,
      userId,
    });
    res.status(201).json({ message });
  },
);

export const updateMessage = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const messageId = req.params.messageId;
    const content = req.body.content;
    const message = await MessageService.updateMessageById({
      messageId,
      content,
      userId,
    });
    res.status(200).json({ message });
  },
);

export const deleteMessage = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const messageId = req.params.messageId;
    await MessageService.deleteMessageById({
      messageId,
      userId,
    });
    res.status(200).json({ message: "Message deleted successfully" });
  },
);
