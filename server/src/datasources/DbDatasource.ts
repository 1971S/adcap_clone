import { injectable } from "inversify";
import Mongoose from "mongoose";

@injectable()
export class DbDatasource {
  database!: Mongoose.Connection;

  public async connect(): Promise<void> {
    if (this.database) {
      return;
    }

    Mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.database = Mongoose.connection;

    this.database.once("open", async () => {
      console.log("Connected to database");
    });

    this.database.on("error", () => {
      console.log("Error connecting to database");
    });
  }

  public async disconnect(): Promise<void> {
    if (!this.database) {
      return;
    }

    Mongoose.disconnect();
  }
}
