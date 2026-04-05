import prisma from "../db";

export interface TokenInsertModel {
  userId: string;
  token_hashed: string;
  expiresAt: Date;
}

export const saveNewToken = async ({
  userId,
  token_hashed,
  expiresAt,
}: TokenInsertModel) => {
  // prisma.$transaction(async (prisma) => {
  //   await prisma.refreshToken.updateMany({
  //     where: {
  //       userId,
  //     },
  //     data: {
  //       revoked: true,
  //     },
  //   });
  await prisma.refreshToken.create({
    data: { userId, token_hashed, expiresAt },
  });
};
// );};

export const revokeToken = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) =>
  await prisma.refreshToken.update({
    where: {
      userId,
      token_hashed: token,
    },
    data: {
      revoked: true,
    },
  });

export const findToken = async ({ token }: { token: string }) =>
  await prisma.refreshToken.findUnique({ where: { token_hashed: token } });

export const revokeAndSaveToken = async ({
  oldToken,
  newToken,
  userId,
  expiresAt,
}: {
  oldToken: string;
  newToken: string;
  userId: string;
  expiresAt: Date;
}) => {
  await prisma.$transaction(async (prisma) => {
    await prisma.refreshToken.update({
      where: {
        token_hashed: oldToken,
      },
      data: {
        revoked: true,
      },
    });
    await prisma.refreshToken.create({
      data: {
        token_hashed: newToken,
        userId,
        expiresAt,
      },
    });
  });
};

export const revokeTokenWithoutUserId = async ({ token }: { token: string }) =>
  await prisma.refreshToken.update({
    where: {
      token_hashed: token,
    },
    data: {
      revoked: true,
    },
  });
