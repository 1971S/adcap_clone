import { injectable, inject } from "inversify";

import { INTERACTOR_TYPES } from "../../../inversify-config/types/InteractorTypes";
import { ReqHandler } from "../../../common/ReqHandler";
import { Interactor } from "../../../common/Interactor";
import { Request } from "../../../common/Request";

@injectable()
export class PatchUsersMeReqHandler implements ReqHandler<any> {
  constructor(
    @inject(INTERACTOR_TYPES.UPDATE_USER)
    private readonly updateUserInteractor: Interactor<any, any>
  ) {}

  public async handle(req: Request): Promise<any> {
    const query: any = {
      _id: req.subjectFromAuth.userId,
    };

    if (req.body.money !== undefined) {
      query.money = req.body.money;
    }

    if (req.body.businesses !== undefined) {
      query.businesses = req.body.businesses;
    }

    const user = await this.updateUserInteractor.interact(query);

    return user;
  }
}
