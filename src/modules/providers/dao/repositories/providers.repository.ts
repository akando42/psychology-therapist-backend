import { ProvidersConverterInstance } from "../../converters/my-sql/providers.converter";
import { AbstractRepository } from "../../../../behavior/repositories/repository.abstract";
import { DataModel } from "../../../../../datamodels/datamodel";
import { GetByIdQuery } from "../queries/mysql/get-by-id";
import { ProviderMySqlDAOInstance } from "../my-sql/provider-mysql.dao";
import { IProvider } from "../../../../models/provider";
import { GetAdminProviders } from "../queries/mysql/get-admin-providers";
import { GetAllBy } from "../../../admin/dao/queries/mysql/get-all-by";




export class ProvidersRepository extends AbstractRepository<IProvider>{
    constructor() {
        super(ProviderMySqlDAOInstance, ProvidersConverterInstance);
    }

    getById(id: string): Promise<IProvider> {
        return super.getBy(new GetByIdQuery(DataModel.tables.providers.table, id).toDQuery());
    }

    getAllBy(query: any): Promise<IProvider[]> {
        return super.getAllBy(new GetAllBy(query).toDQuery());
    }

}

export const ProvidersRepoInstance: ProvidersRepository = new ProvidersRepository();
