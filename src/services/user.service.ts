import * as UserRepository from "../repositories/user.repository";

export const findAllUsers = async () => {
  const users = await UserRepository.findAllUsers();
  return users;
};

export const findUserByEmail = async (email: string) => {
  const user = await UserRepository.findUserByEmail({ email });
  return user;
};
