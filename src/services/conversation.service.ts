// src/services/conversation.service.ts

import { AppError } from "../utils/AppError";
import * as ConversationRepository from "../repositories/conversation.repository";

export const findConversationsByUser = async ({
  userId,
}: {
  userId: string;
}) => {
  const conversations = await ConversationRepository.findAllConversationsByUser(
    { userId },
  );
  //console.log("from conversation.service", conversations);
  return conversations;
};

export const createNewConversation = async (
  userId: string,
  receiverId: string,
) => {
  const conversation =
    await ConversationRepository.findConversationBetweenTwoUsers({
      userId,
      receiverId,
    });
  if (conversation) {
    return conversation;
  }
  const newConversation = await ConversationRepository.saveNewConversation({
    userId,
    receiverId,
  });
  return newConversation;
};

export const createNewGroupConversation = async (
  userId: string,
  receiverIds: string[],
  title: string,
) => {
  const conversation = await ConversationRepository.saveNewGroupConversation({
    userId,
    receiverIds,
    title,
  });
  return conversation;
};

export const deleteConversation = async ({
  conversationId,
  userId,
}: {
  conversationId: string;
  userId: string;
}) => {
  const conversation = await ConversationRepository.findConversationById({
    id: conversationId,
  });
  if (!conversation) {
    throw new AppError("Conversation not found", 404);
  }
  if (!conversation.members.some((member) => member.userId === userId)) {
    throw new AppError("You are not a member of this conversation", 403);
  }
  await ConversationRepository.deleteConversationById({ id: conversation.id });
};
