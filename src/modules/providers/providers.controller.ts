
import { ProvidersServiceInstance } from "./providers.service";
import { IProvider } from "../../models/provider";
import { WriteReadController } from "../../behavior/controllers/write-read.controller";




export class ProvidersController extends WriteReadController<IProvider>{
    constructor() {
        super(ProvidersServiceInstance);
    }

    getById(id: string): Promise<IProvider> {

        return ProvidersServiceInstance.getById(id);
    }

}

export const ProvidersControllerInstance: ProvidersController = new ProvidersController();