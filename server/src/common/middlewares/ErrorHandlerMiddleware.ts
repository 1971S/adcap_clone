import express from "express";

export function errorHandlerMiddleware(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(err.code);
  res.json(err);
}
