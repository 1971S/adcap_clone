import { injectable, inject } from "inversify";

import express from "express";
import http from "http";
import net from "net";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { container } from "./inversify-config/container";
import { DATASOURCE_TYPES } from "./inversify-config/types/DatasourceTypes";
import { DbDatasource } from "./datasources/DbDatasource";
import { ROUTER_TYPES } from "./inversify-config/types/RouterTypes";
import { Router } from "./common/Router";
import { notFoundMiddleware } from "./common/middlewares/NotFoundMiddleware";
import { errorHandlerMiddleware } from "./common/middlewares/ErrorHandlerMiddleware";

@injectable()
export class App {
  public express!: express.Express;
  public server!: http.Server;

  constructor(
    @inject(DATASOURCE_TYPES.DB)
    private readonly dbDatasource: DbDatasource,
    @inject(ROUTER_TYPES.MAIN)
    private readonly mainRouter: Router
  ) {
    if (process.env.NODE_ENV !== "production") {
      dotenv.config({ path: "config/local.env" });
    }

    this.init();
  }

  public async start(): Promise<http.Server | void> {
    try {
      await this.dbDatasource.connect();

      this.server.on("error", this.onServerError.bind(this));
      this.server.on("listening", this.onServerListening.bind(this));

      return this.server.listen(process.env.PORT);
    } catch (err) {
      process.exit(1);
    }
  }

  private init() {
    this.configExpress();

    this.configServer();
  }

  private configExpress(): void {
    this.express = express();

    this.express.disable("x-powered-by");
    this.express.set("container", container);

    this.express.use(cors());
    this.express.use(bodyParser.json({ limit: "50mb" }));
    this.express.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    this.express.use(this.mainRouter.middleware);
    this.express.use(notFoundMiddleware);
    this.express.use(errorHandlerMiddleware);
  }

  private configServer(): void {
    this.server = http.createServer(this.express);
  }

  private onServerError(err: NodeJS.ErrnoException): void {
    console.log("down" + err);
  }

  private onServerListening(): void {
    const addr: string | net.AddressInfo | null = this.server.address();
    const bind: string =
      typeof addr === "string"
        ? "pipe " + addr
        : addr !== null
        ? "port " + addr.port
        : "";

    console.log("Listening on " + bind);
  }
}
