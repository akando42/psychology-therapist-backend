import { AbstractRolesRepository } from "../../roles.repository";
import { IRole } from "../../../../../models/role";


export class MySqlRolesRepository extends AbstractRolesRepository {

    constructor(dbAccess, converter) {
        super(dbAccess, converter);
    }


    createRole(Role: IRole): Promise<IRole> {
        throw new Error("Method not implemented.");
    }
    deleteRole(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}