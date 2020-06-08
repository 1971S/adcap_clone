import { injectable, inject } from "inversify";
import express from "express";
import HttpCode from "http-status-codes";

import { REQ_HANDLER_TYPES } from "../../../../inversify-config/types/ReqHandlerTypes";
import { ReqHandler } from "../../../../common/ReqHandler";
import { Router } from "../../../../common/Router";
import { Request } from "../../../../common/Request";
import { AuthMiddleware } from "../../../../common/middlewares/AuthMiddleware";

@injectable()
export class MeRouter extends Router {
  constructor(
    @inject(REQ_HANDLER_TYPES.GET_USERS_ME)
    private readonly getUsersMeReqHandler: ReqHandler<any>,
    @inject(REQ_HANDLER_TYPES.PATCH_USERS_ME)
    private readonly patchUsersMeReqHandler: ReqHandler<any>
  ) {
    super();

    this.init();
  }

  protected init(): void {
    this.router
      .route("/")
      .get([AuthMiddleware, this.get.bind(this)])
      .patch([AuthMiddleware, this.patch.bind(this)]);
  }

  private async get(
    req: Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const userApi: any = await this.getUsersMeReqHandler.handle(req);

      res.status(HttpCode.OK);
      res.json(userApi);
    } catch (err) {
      next(err);
    }
  }

  private async patch(
    req: Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const userApi: any = await this.patchUsersMeReqHandler.handle(req);

      res.status(HttpCode.OK);
      res.json(userApi);
    } catch (err) {
      next(err);
    }
  }
}
