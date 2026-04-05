// src/middlewares/auth.middleware.ts

import express from "express";
import * as AuthService from "../services/auth.service";
import { AppError } from "../utils/AppError";

export const verifyAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new AppError("Token not found", 401);
  const user = await AuthService.verifyRefreshToken(token);
  req.user = user;
  next();
};
