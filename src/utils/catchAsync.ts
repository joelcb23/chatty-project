// utils/catchAsync.ts
import express from "express";

export const catchAsync = (fn: Function) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // Ejecuta el controlador. Si hay error, lo empuja al next() automáticamente
    fn(req, res, next).catch((err: any) => next(err));
  };
};
