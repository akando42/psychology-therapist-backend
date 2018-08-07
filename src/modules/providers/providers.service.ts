import { WriterReaderService } from "../../behavior/services/writer-reader-service";
import { IProvider } from "../../models/provider";
import { ProvidersRepoInstance } from "./dao/repositories/providers.repository";

export class ProvidersService extends WriterReaderService<IProvider> {
    constructor() {
        super(ProvidersRepoInstance);
    }


    getById(id: string): Promise<IProvider> {
        return ProvidersRepoInstance.getById(id);
    }

}

export const ProvidersServiceInstance: ProvidersService = new ProvidersService();