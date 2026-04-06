// src/middlewares/auth.middleware.ts

import express from "express";
import * as AuthService from "../services/auth.service";
import {} from "../utils/AppError";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const verifyAuth = catchAsync(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const authHeader = req.headers.authorization; // Access Token sent by the client

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new AppError("Token not found", 401);
    }
    const { userId, username, email } = AuthService.verifyAccessToken(token);
    req.user = { id: userId, username, email };
    next();
  },
);
