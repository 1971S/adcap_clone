import { Container } from "inversify";

import { BASE_TYPES } from "./types/types";
import { App } from "../App";
import { DATASOURCE_TYPES } from "./types/DatasourceTypes";
import { DbDatasource } from "../datasources/DbDatasource";
import { routersContainer } from "./routersContainer";
import { interactorsContainer } from "./interactorsContainer";
import { reqHandlersContainer } from "./reqHandlersContainer";

export const container = new Container();

container.bind(BASE_TYPES.APP).to(App).inSingletonScope();

container.bind(DATASOURCE_TYPES.DB).to(DbDatasource);

// Routers
container.load(routersContainer);

// Interactors
container.load(interactorsContainer);

// ReqHandlers
container.load(reqHandlersContainer);
