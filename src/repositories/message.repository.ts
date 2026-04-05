// src/repositories/message.repository.ts

import prisma from "../db";

export const saveNewMessage = async ({
  content,
  conversationId,
  senderId,
}: {
  content: string;
  conversationId: string;
  senderId: string;
}) => {
  return await prisma.message.create({
    data: {
      content,
      conversationId,
      senderId,
    },
  });
};
export const findMessagesByConversation = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  return await prisma.message.findMany({ where: { conversationId } });
};
export const updateOneMessageById = async ({
  messageId,
  content,
  senderId,
}: {
  messageId: string;
  content: string;
  senderId: string;
}) => {
  return await prisma.message.update({
    where: { id: messageId, senderId },
    data: {
      content,
    },
  });
};
export const deleteOneMessageById = async ({
  messageId,
  senderId,
}: {
  messageId: string;
  senderId: string;
}) => {
  await prisma.message.delete({
    where: { id: messageId, senderId },
  });
};
