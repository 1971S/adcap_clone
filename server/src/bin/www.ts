import "reflect-metadata";

import { App } from "../App";
import { container } from "../inversify-config/container";
import { BASE_TYPES } from "../inversify-config/types/types";

const app: App = container.get(BASE_TYPES.APP);

app.start();
