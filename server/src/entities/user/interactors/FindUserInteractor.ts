import { injectable, inject } from "inversify";
import HttpCode from "http-status-codes";

import { Interactor } from "../../../common/Interactor";
import { User } from "../models/User";
import { AppError } from "../../../common/AppError";
import { INTERACTOR_TYPES } from "../../../inversify-config/types/InteractorTypes";

@injectable()
export class FindUserInteractor implements Interactor<any, any> {
  constructor(
    @inject(INTERACTOR_TYPES.UPDATE_USER)
    private readonly updateUserInteractor: Interactor<any, any>
  ) {}

  public async interact(query: any): Promise<any> {
    return User.findOne(query)
      .then(async (data: any) => {
        const businessesWithManagers: any[] = this.hasBusinessesWithManagers(
          data
        );

        const elapsedTimeSinceUpdateInSeconds =
          (Date.now() - data.updatedAt) / 1000;

        if (
          businessesWithManagers.length > 0 &&
          elapsedTimeSinceUpdateInSeconds > 10
        ) {
          const newUserMoney: number = this.calculateAwayEarnings(
            elapsedTimeSinceUpdateInSeconds,
            businessesWithManagers
          );

          const userUpdateQuery: any = {
            _id: data["id"],
            money: data.money + newUserMoney,
          };

          const updatedUser = await this.updateUserInteractor.interact(
            userUpdateQuery
          );

          return updatedUser;
        } else {
          return data;
        }
      })
      .catch((err: Error) => {
        throw new AppError(err.name, err.message, HttpCode.NOT_FOUND);
      });
  }

  private hasBusinessesWithManagers(user: any): any[] {
    const businessesWithManager = user.businesses.filter(
      (business: any) => business.hasManager
    );

    return businessesWithManager;
  }

  private calculateAwayEarnings(
    elapsedTime: number,
    businessesWithManagers: any[]
  ): number {
    let money: number = 0;

    businessesWithManagers.forEach((business) => {
      if (elapsedTime >= business.rateWaitTime) {
        money +=
          Math.round(elapsedTime / business.rateWaitTime) *
          (business.rateQuantity * (1 + business.upgradeLevel * 0.1));
      }
    });

    return money;
  }
}
