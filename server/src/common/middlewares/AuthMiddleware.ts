import jwt from "jsonwebtoken";

import { Request } from "../Request";

export function AuthMiddleware(req: Request, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.subjectFromAuth = user;
      next();
    }
  );
}
