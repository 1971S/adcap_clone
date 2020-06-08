import express from "express";

export interface Request extends express.Request {
  userFromPath?: any;
  subjectFromAuth?: any;
}
