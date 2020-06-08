import express from "express";
import HttpCode from "http-status-codes";

import { AppError } from "../AppError";

export function notFoundMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const error: any = new AppError(
    notFoundMiddleware.name,
    "Not found",
    HttpCode.NOT_FOUND
  );

  next(error);
}
