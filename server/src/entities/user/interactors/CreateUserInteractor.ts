import { injectable } from "inversify";
import HttpCode from "http-status-codes";

import { AppError } from "../../../common/AppError";
import { Interactor } from "../../../common/Interactor";
import { User } from "../models/User";

@injectable()
export class CreateUserInteractor implements Interactor<any, any> {
  public async interact(query: any): Promise<any> {
    const businessNameList = [
      "Lemonade Stand",
      "Newspaper Delivery",
      "Car Wash",
      "Pizza Delivery",
      "Donut Shop",
      "Shrimp Boat",
      "Hockey Team",
      "Movie Studio",
      "Bank",
      "Oil Company",
    ];

    const userQuery = {
      money: 0,
      businesses: businessNameList.map(
        (businessName: string, index: number) => {
          return {
            name: businessName,
            isUnlocked: index === 0 ? true : false,
            unlockCost: index * 100,
            rateQuantity: index * 5 + 5,
            rateWaitTime: index * 1.5 + 1,
            upgradeCost: index * 0.3 + 1,
            upgradeLevel: 1,
            hasManager: false,
            managerCost: index * 1000 + 200,
          };
        }
      ),
    };

    return User.create(userQuery)
      .then((data: any) => {
        return data;
      })
      .catch((err: Error) => {
        throw new AppError(
          err.name,
          err.message,
          HttpCode.INTERNAL_SERVER_ERROR
        );
      });
  }
}
