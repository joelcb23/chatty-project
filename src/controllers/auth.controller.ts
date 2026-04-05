import express from "express";
import * as AuthService from "../services/auth.service";
import { AppError } from "../utils/AppError";
import { catchAsync } from "src/utils/catchAsync";

const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const register = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { name, username, email, password, confirmPassword } = req.body;
    if (!name || !username || !email || !password || !confirmPassword)
      throw new AppError("All fields are required", 400);
    if (!pattern.test(email)) throw new AppError("Email is invalid", 400);
    if (password.length < 8)
      throw new AppError("Password must be at least 8 characters", 400);
    const { user, accessToken, refreshToken } = await AuthService.registerUser({
      name,
      username,
      email,
      password,
      confirmPassword,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ message: "User created successfully", user, accessToken });
  },
);

export const login = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError("All fields are required", 400);
    if (!pattern.test(email)) throw new AppError("Email is invalid", 400);
    const { user, accessToken, refreshToken } = await AuthService.loginUser(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful", user, accessToken });
  },
);

export const verifyToken = catchAsync(
  async (req: express.Request, res: express.Response) => {
    // get token from cookies
    const token = req.cookies.refreshToken;
    // check if token exists
    if (!token) throw new AppError("Token not found", 401);
    await AuthService.verifyRefreshToken(token);
    res.status(200).json({ message: "Token verified" });
  },
);

export const refreshToken = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken) throw new AppError("Token not found", 401);
    const { accessToken, refreshToken } =
      await AuthService.refreshTokens(oldToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ accessToken });
  },
);

export const logout = catchAsync(
  async (req: express.Request, res: express.Response) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    const token = req.cookies.refreshToken;
    if (!token) return res.status(200).json({ message: "No token found" });
    try {
      await AuthService.logoutUser(token);
    } catch (err) {}
    res.status(200).json({ message: "Logout successful" });
  },
);
