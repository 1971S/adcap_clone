import { injectable, inject } from "inversify";

import { INTERACTOR_TYPES } from "../../../inversify-config/types/InteractorTypes";
import { ReqHandler } from "../../../common/ReqHandler";
import { Interactor } from "../../../common/Interactor";
import { Request } from "../../../common/Request";

@injectable()
export class GetUsersMeReqHandler implements ReqHandler<any> {
  constructor(
    @inject(INTERACTOR_TYPES.FIND_USER)
    private readonly findUserInteractor: Interactor<any, any>
  ) {}

  public async handle(req: Request): Promise<any> {
    const query = { _id: req.subjectFromAuth.userId };

    const user = await this.findUserInteractor.interact(query);

    return user;
  }
}
