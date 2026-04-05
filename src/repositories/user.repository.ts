// src/repositories/user.repository.ts

import prisma from "../db";

export interface UserInsertModel {
  name: string;
  username: string;
  email: string;
  passwordHashed: string;
}
export const saveNewUser = async ({
  name,
  username,
  email,
  passwordHashed,
}: UserInsertModel) =>
  await prisma.user.create({
    data: {
      name,
      username,
      email,
      password_hashed: passwordHashed,
    },
  });

export const findUserByEmail = async ({ email }: { email: string }) =>
  await prisma.user.findUnique({
    where: {
      email,
    },
  });

export const findUserByUsername = async ({ username }: { username: string }) =>
  await prisma.user.findUnique({
    where: {
      username,
    },
  });

export const findUserById = async ({ id }: { id: string }) =>
  await prisma.user.findUnique({
    where: {
      id,
    },
  });

export const findAllUsers = async () => await prisma.user.findMany();

export const updateOneUserById = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) =>
  await prisma.user.update({
    where: { id },
    data,
  });

export const deleteOneUserById = async ({ id }: { id: string }) =>
  await prisma.user.delete({
    where: { id },
  });
