import { IRole } from "../../../../models/role";


export interface IRolesService {

    createRole(role: IRole): Promise<IRole>;
}