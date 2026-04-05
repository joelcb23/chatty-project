import express from "express";
import * as UserService from "../services/user.service";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const getUsers = async (req: express.Request, res: express.Response) => {
  const users = await UserService.findAllUsers();
  res.status(200).json({ users });
};

export const getUserByEmail = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const email = req.params.email;
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    res.status(200).json({ user });
  },
);
