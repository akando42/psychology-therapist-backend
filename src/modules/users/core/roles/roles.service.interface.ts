import { IRole } from "../../../../models/role";
/**
 * when user log in a to sertain role need to very if user have that role and then allow authentication
 * its a role save guard for login and loged as feature
 */

export interface IRolesService {

    createRole(role: IRole): Promise<IRole>;
}