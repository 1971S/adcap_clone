import { injectable, inject } from "inversify";
import express from "express";
import HttpCode from "http-status-codes";

import { Router } from "../../../common/Router";
import { Request } from "express";
import { REQ_HANDLER_TYPES } from "../../../inversify-config/types/ReqHandlerTypes";
import { ROUTER_TYPES } from "../../../inversify-config/types/RouterTypes";
import { ReqHandler } from "../../../common/ReqHandler";

@injectable()
export class UsersRouter extends Router {
  constructor(
    @inject(REQ_HANDLER_TYPES.POST_USERS)
    private readonly postUsersReqHandler: ReqHandler<any>,
    @inject(ROUTER_TYPES.ME)
    private readonly meRouter: Router
  ) {
    super();

    this.init();
  }

  protected init(): void {
    this.router.route("/").post(this.post.bind(this));

    this.router.use("/me", this.meRouter.middleware);
  }

  private async post(
    req: Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const userApi: any = await this.postUsersReqHandler.handle(req);

      res.status(HttpCode.CREATED);
      res.json(userApi);
    } catch (err) {
      next(err);
    }
  }
}
