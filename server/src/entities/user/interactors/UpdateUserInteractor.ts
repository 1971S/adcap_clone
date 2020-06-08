import { injectable } from "inversify";
import HttpCode from "http-status-codes";

import { Interactor } from "../../../common/Interactor";
import { User } from "../models/User";
import { AppError } from "../../../common/AppError";

@injectable()
export class UpdateUserInteractor implements Interactor<any, any> {
  public async interact(query: any): Promise<any> {
    const updateQuery = {
      $set: { ...query },
    };

    delete updateQuery.$set._id;

    return User.findByIdAndUpdate(query._id, updateQuery, { new: true })
      .then((data: any) => {
        return data;
      })
      .catch((err: Error) => {
        throw new AppError(err.name, err.message, HttpCode.NOT_FOUND);
      });
  }
}
