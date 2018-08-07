
import { WriteReadController } from "../../../../behavior/controllers/write-read.controller";
import { ProvidersServiceInstance } from "../../../providers/providers.service";
import { IProvider } from "../../../../models/provider";
import { GetAllBy } from "../../dao/queries/mysql/get-all-by";




export class AdminProvidersController extends WriteReadController<IProvider>{
    constructor() {
        super(ProvidersServiceInstance);
    }

    getAllBy(query: any): Promise<IProvider[]> {
        return ProvidersServiceInstance.getAllBy(query);
    }
}

export const AdminProvidersControllerInstance: AdminProvidersController = new AdminProvidersController();