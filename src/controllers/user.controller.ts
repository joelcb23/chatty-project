// src/controllers/user.controller.ts

import express from "express";
import * as UserService from "../services/user.service";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const getUsers = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const users = await UserService.findAllUsers();
    res.status(200).json({ users });
  },
);

export const getUserByEmail = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const email = req.params.email;
    const user = await UserService.findOneUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    res.status(200).json({ user });
  },
);

export const updateUser = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const data = req.body;
    const user = await UserService.updateOneUser({
      userId,
      data,
    });
    res.status(200).json({ user });
  },
);

export const deleteUser = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    await UserService.deleteOneUser({ userId });
    res.status(204).send();
  },
);
