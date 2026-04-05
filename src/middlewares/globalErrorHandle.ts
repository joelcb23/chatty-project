// src/middlewares/globalErrorHandler.ts

import express from "express";
import { AppError } from "../utils/AppError";

const handlePrismaDuplicate = (err: any) => {
  const field = err.meta?.target ? err.meta.target : "unknown field";
  return new AppError(`${field} already exists`, 409);
};
export const globalErrorHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  let err = Object.assign(error);
  if (err.code === "P2002") {
    err = handlePrismaDuplicate(err);
  } else if (err.code === "P2025") {
    err = new AppError("Resource not found", 404);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error("💥 Critic Error:", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};
