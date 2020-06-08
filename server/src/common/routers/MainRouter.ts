import { injectable, inject } from "inversify";

import { Router } from "../Router";
import { ROUTER_TYPES } from "../../inversify-config/types/RouterTypes";

@injectable()
export class MainRouter extends Router {
  constructor(
    @inject(ROUTER_TYPES.USERS)
    private readonly usersRouter: Router
  ) {
    super();

    this.init();
  }

  protected init(): void {
    this.router.use("/users", this.usersRouter.middleware);
  }
}
