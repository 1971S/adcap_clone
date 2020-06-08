import { injectable, inject } from "inversify";
import jwt from "jsonwebtoken";

import { ReqHandler } from "../../../common/ReqHandler";
import { Request } from "../../../common/Request";
import { Interactor } from "../../../common/Interactor";
import { INTERACTOR_TYPES } from "../../../inversify-config/types/InteractorTypes";

@injectable()
export class PostUsersReqHandler implements ReqHandler<any> {
  constructor(
    @inject(INTERACTOR_TYPES.CREATE_USER)
    private readonly createUserInteractor: Interactor<any, any>
  ) {}

  public async handle(req: Request): Promise<any> {
    const query = {};

    const user = await this.createUserInteractor.interact(query);

    const token = this.generateAccessToken({ userId: user["_id"] });

    return token;
  }

  private generateAccessToken(data: any) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "720000s",
    });
  }
}
