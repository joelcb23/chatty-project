// src/services/user.service.ts

import { AppError } from "../utils/AppError";
import * as UserRepository from "../repositories/user.repository";

export const findAllUsers = async () => {
  const users = await UserRepository.findAllUsers();
  return users;
};

export const findOneUserByEmail = async (email: string) => {
  const user = await UserRepository.findUserByEmail({ email });
  return user;
};

export const updateOneUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: any;
}) => {
  const userData = await UserRepository.findUserById({ id: userId });
  if (!userData) {
    throw new AppError("User not found", 404);
  }
  const newData = {
    name: data.name || userData.name,
    passwordHashed: data.passwordHashed || userData.password_hashed,
  };
  return await UserRepository.updateOneUserById({ id: userId, data: newData });
};

export const deleteOneUser = async ({ userId }: { userId: string }) => {
  await UserRepository.deleteOneUserById({ id: userId });
  return;
};
