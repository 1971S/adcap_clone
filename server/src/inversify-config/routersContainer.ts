import { ContainerModule, interfaces } from "inversify";

import { ROUTER_TYPES } from "./types/RouterTypes";
import { MainRouter } from "../common/routers/MainRouter";
import { MeRouter } from "../entities/user/routers/namespaced/MeRouter";
import { UsersRouter } from "../entities/user/routers/UsersRouter";

export const routersContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind(ROUTER_TYPES.MAIN).to(MainRouter);
  bind(ROUTER_TYPES.ME).to(MeRouter);
  bind(ROUTER_TYPES.USERS).to(UsersRouter);
});
