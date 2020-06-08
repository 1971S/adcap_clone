import { ContainerModule, interfaces } from "inversify";

import { INTERACTOR_TYPES } from "./types/InteractorTypes";
import { CreateUserInteractor } from "../entities/user/interactors/CreateUserInteractor";
import { FindUserInteractor } from "../entities/user/interactors/FindUserInteractor";
import { UpdateUserInteractor } from "../entities/user/interactors/UpdateUserInteractor";

export const interactorsContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(INTERACTOR_TYPES.CREATE_USER).to(CreateUserInteractor);
    bind(INTERACTOR_TYPES.FIND_USER).to(FindUserInteractor);
    bind(INTERACTOR_TYPES.UPDATE_USER).to(UpdateUserInteractor);
  }
);
