import { IRolesService } from "./roles.service.interface";
import { IRole } from "../../../../models/role";



export class RolesService {
    constructor(private _rolesService: IRolesService) {
    }

    createRole(role: IRole): Promise<IRole> {
        return new Promise<IRole>(async (resolve, reject) => {

        });
    }

    assignRoleToUser(userId: number, roleId: number): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {

        });
    }

}