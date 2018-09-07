import { AbstractRepository } from "../../../behavior/repositories/repository.abstract";
import { IRole } from "../../../models/role";


export abstract class AbstractRolesRepository extends AbstractRepository<IRole>{
    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }

    abstract createRole(Role: IRole): Promise<IRole>;

    abstract deleteRole(id: number): Promise<void>;


}