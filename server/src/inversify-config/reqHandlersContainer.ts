import { ContainerModule, interfaces } from "inversify";

import { REQ_HANDLER_TYPES } from "./types/ReqHandlerTypes";
import { GetUsersMeReqHandler } from "../entities/user/req-handlers/GetUsersMeReqHandler";
import { PatchUsersMeReqHandler } from "../entities/user/req-handlers/PatchUsersMeReqHandler";
import { PostUsersReqHandler } from "../entities/user/req-handlers/PostUsersReqHandler";

export const reqHandlersContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(REQ_HANDLER_TYPES.GET_USERS_ME).to(GetUsersMeReqHandler);
    bind(REQ_HANDLER_TYPES.PATCH_USERS_ME).to(PatchUsersMeReqHandler);
    bind(REQ_HANDLER_TYPES.POST_USERS).to(PostUsersReqHandler);
  }
);
