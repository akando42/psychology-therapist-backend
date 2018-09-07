import { AbstractRolesRepository } from "../roles.repository";
import { IRole } from "../../../../models/role";
import { GetByQuery } from "../../../../query-spec/my-sql/get-by.query";
import { UpdateQuery } from "../../../../query-spec/my-sql/update.query";


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