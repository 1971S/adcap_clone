import express from "express";

export interface ReqHandler<Output> {
  handle(req: express.Request): Promise<Output>;
}
