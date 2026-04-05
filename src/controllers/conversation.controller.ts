// src/controllers/conversation.controller.ts

import express from "express";
import * as ConversationService from "../services/conversation.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const getConversations = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const conversations = await ConversationService.findConversationsByUser({
      userId,
    });
    res.status(200).json({ conversations });
  },
);

export const createConversation = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId: string = req.user.id;
    const { receiverId }: { receiverId: string } = req.body;
    const conversation = await ConversationService.createNewConversation(
      userId,
      receiverId,
    );
    res.status(201).json({ conversation });
  },
);

export const createGroupConversation = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId: string = req.user.id;
    console.log("userid from conversation.controller", userId);
    const { receiverIds, title }: { receiverIds: string[]; title: string } =
      req.body;
    console.log(req.body);

    if (!title || title?.trim() === "" || receiverIds?.length < 3)
      throw new AppError(
        "Title must not be empty and at least 3 members are required",
        400,
      );

    const conversation = await ConversationService.createNewGroupConversation(
      userId,
      receiverIds,
      title,
    );
    res.status(201).json({ conversation });
  },
);

export const deleteConversation = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const conversationId = req.params.conversationId;
    await ConversationService.deleteConversation({ conversationId, userId });

    res.status(204).send();
  },
);
