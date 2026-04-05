// src/services/message.service.ts
import { AppError } from "../utils/AppError";
import * as ConversationRepository from "../repositories/conversation.repository";
import * as MessageRepository from "../repositories/message.repository";

export const getMessagesByConversation = async ({
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
  return await MessageRepository.findMessagesByConversation({ conversationId });
};

export const createNewMessage = async ({
  content,
  conversationId,
  userId,
}: {
  content: string;
  conversationId: string;
  userId: string;
}) => {
  return await MessageRepository.saveNewMessage({
    content,
    conversationId,
    senderId: userId,
  });
};

export const updateMessageById = async ({
  messageId,
  content,
  userId,
}: {
  messageId: string;
  content: string;
  userId: string;
}) => {
  return await MessageRepository.updateOneMessageById({
    messageId,
    content,
    senderId: userId,
  });
};

export const deleteMessageById = async ({
  messageId,
  userId,
}: {
  messageId: string;
  userId: string;
}) => {
  await MessageRepository.deleteOneMessageById({
    messageId,
    senderId: userId,
  });
  return;
};
