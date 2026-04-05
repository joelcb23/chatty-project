import jwt from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import config from "../config/config";
import {
  encryptPassword,
  encryptToken,
  comparePassword,
} from "../utils/encryptPass";
import * as UserRepository from "../repositories/user.repository";
import * as TokenRepository from "../repositories/token.repository";
import { AppError } from "src/utils/AppError";

export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserResult {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
}
const accessTokenSign = (user: UserResult) =>
  jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    config.ACCESS_SECRET,
    {
      expiresIn: "10m",
    },
  );

const refreshTokenSign = () => randomBytes(64).toString("hex");

const cleanUserResult = (userEntity: any): UserResult => {
  const { password_hashed, ...user } = userEntity;
  return user;
};

export const registerUser = async ({
  name,
  username,
  email,
  password,
  confirmPassword,
}: CreateUserDTO) => {
  if (password !== confirmPassword)
    throw new AppError("Passwords do not match", 400);
  const user = await UserRepository.saveNewUser({
    name,
    username: `@${username.toLowerCase()}`,
    email,
    passwordHashed: await encryptPassword(password),
  });
  const accessToken = accessTokenSign(cleanUserResult(user));
  const refreshToken = refreshTokenSign();
  await TokenRepository.saveNewToken({
    userId: user.id,
    token_hashed: encryptToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user: cleanUserResult(user), accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserRepository.findUserByEmail({
    email,
  });
  if (!user) throw new AppError("User not found", 404);
  const matchPass = await comparePassword(password, user.password_hashed);
  if (!matchPass) throw new AppError("Invalid password", 401);

  const accessToken = accessTokenSign(cleanUserResult(user));
  const refreshToken = refreshTokenSign();
  await TokenRepository.saveNewToken({
    userId: user.id,
    token_hashed: encryptToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user: cleanUserResult(user), accessToken, refreshToken };
};

export const verifyRefreshToken = async (token: string) => {
  const tokenFound = await TokenRepository.findToken({
    token: encryptToken(token),
  });
  if (!tokenFound) throw new AppError("Token not found", 404);
  if (tokenFound.revoked) throw new AppError("Token revoked", 401);
  if (tokenFound.expiresAt < new Date()) {
    await TokenRepository.revokeToken({
      userId: tokenFound.userId,
      token: encryptToken(token),
    });
    throw new AppError("Token expired", 401);
  }
  const user = await UserRepository.findUserById({
    id: tokenFound.userId,
  });
  return cleanUserResult(user);
};

export const refreshTokens = async (token: string) => {
  const user = await verifyRefreshToken(token);
  if (!user) throw new AppError("User not found", 404);
  const accessToken = accessTokenSign(user);
  const refreshToken = refreshTokenSign();
  await TokenRepository.revokeAndSaveToken({
    userId: user.id,
    oldToken: token,
    newToken: encryptToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return { accessToken, refreshToken };
};

export const logoutUser = async (token: string) => {
  await TokenRepository.revokeTokenWithoutUserId({
    token: encryptToken(token),
  });
  return;
};
