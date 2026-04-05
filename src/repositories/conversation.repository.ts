// src/repositories/conversation.repository.ts

import prisma from "../db";

export const saveNewConversation = async ({
  userId,
  receiverId,
}: {
  userId: string;
  receiverId: string;
}) => {
  return await prisma.conversation.create({
    data: {
      members: {
        create: [{ userId }, { userId: receiverId }],
      },
    },
  });
};

export const saveNewGroupConversation = async ({
  userId,
  receiverIds,
  title,
}: {
  userId: string;
  receiverIds?: string[];
  title: string;
}) => {
  return await prisma.$transaction(async (prisma) => {
    const conversation = await prisma.conversation.create({
      data: {
        title,
        isGroup: true,
        members: {
          create: [
            { userId },
            ...(receiverIds || []).map((id) => ({ userId: id })),
          ],
        },
      },
    });
    await prisma.participant.update({
      where: {
        userId_conversationId: { userId, conversationId: conversation.id },
      },
      data: { roleUser: "ADMIN" },
    });
    return conversation;
  });
};

export const findAllConversationsByUser = async ({
  userId,
}: {
  userId: string;
}) => {
  return await prisma.conversation.findMany({
    where: { members: { some: { userId } } },
    include: { members: true },
  });
};

export const findConversationBetweenTwoUsers = async ({
  userId,
  receiverId,
}: {
  userId: string;
  receiverId: string;
}) => {
  return await prisma.conversation.findFirst({
    where: {
      members: {
        every: {
          userId: { in: [userId, receiverId] },
        },
      },
    },
  });
};

export const findConversationById = async ({ id }: { id: string }) => {
  return await prisma.conversation.findUnique({
    where: { id },
    include: { members: true },
  });
};

export const updateConversationById = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  return await prisma.conversation.update({
    where: { id },
    data: {},
  });
};

export const deleteConversationById = async ({ id }: { id: string }) => {
  await prisma.conversation.delete({
    where: { id },
  });
};
